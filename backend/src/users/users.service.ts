import { SendEmailDto } from './dto/send-email.dto';
import { BookCallDto } from './dto/book-call.dto';
import { AddProposalDto } from './dto/add-proposal.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import * as crypto from 'crypto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import sendEmail from '../shared/sendEmail';

import { User } from './interfaces/user.interface';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import * as moment from 'moment-timezone';
import ErrorResponse from 'src/shared/errorResponse';
import { Proposal } from './interfaces/proposal.interface';
import { Booking } from './interfaces/booking.interface';

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Proposal') private proposalModel: Model<Proposal>,
    @InjectModel('Booking') private bookingModel: Model<Booking>,
    private jwtService: JwtService,
    @Inject(REQUEST) private readonly req: Request,
  ) {}

  async addUser(name: string, user: User) {
    if (!user.isAdmin)
      throw new ErrorResponse('User must be admin to access this content', 401);

    const newUser = await this.userModel.create({ clientName: name });

    user.client = newUser;

    await user.save();

    return { success: true, client: newUser, user };
  }

  async updateClient(updateClientDto: UpdateClientDto, user: User) {
    const { clientName } = updateClientDto;

    if (!user.isAdmin)
      throw new ErrorResponse('User must be admin to access this content', 401);

    const client = await this.userModel.findById(user.client._id);

    client.clientName = clientName;

    await client.save();

    user.client = client;

    await user.save();

    return { success: true, client, user };
  }

  async getUsers(user: User) {
    if (!user.isAdmin)
      throw new ErrorResponse('User must be admin to access this content', 401);

    const users = await this.userModel.find({ isAdmin: false });

    return {
      success: true,
      users,
    };
  }

  async updateUser(updateUserDto: UpdateUserDto, user: User) {
    const {
      userName,
      email: updateEmail,
      currentPassword,
      newPassword,
    } = updateUserDto;

    const email = updateEmail.toLowerCase();

    const currentUser = await this.userModel
      .findById(user._id)
      .select('+password');

    if (!currentUser) {
      throw new ErrorResponse('Could not update user', 500);
    }

    // update name
    currentUser.userName = userName;

    // if email is changed, update email
    if (currentUser.email !== email) {
      // check for user with new email
      const foundUser = await this.userModel.findOne({
        email,
      });
      if (foundUser) {
        throw new ErrorResponse('A user with that email already exists', 403);
      }
      // add new email to model
      currentUser.newEmail = email;
      // generate token and hash
      const token = crypto.randomBytes(20).toString('hex');
      const hash = crypto.createHash('sha256').update(token).digest('hex');
      // add hash to user
      currentUser.verifyEmailToken = hash;

      // get base URL from request protocol and host domain
      const baseUrl = `${this.req.protocol}://${
        process.env.NODE_ENV === 'production'
          ? this.req.get('host')
          : 'localhost:3000'
      }`;
      const actionLink = `${baseUrl}/verify-email/${token}`;

      // send change email token to user via email
      await sendEmail({
        type: 'UPDATE_EMAIL',
        actionLink,
        user: currentUser,
        baseUrl,
        reason: `You have recieved this email because a request was made to update the email address associated with your account at <span class="clear-footer-link" style="color: #474545; text-decoration: none;">ApexApps.com.au</span>, this is not a promotional email.`,
        buttonText: 'Update Email',
      });
    }

    // if password is submitted, update password
    if (currentPassword && newPassword) {
      // check if current password is valid
      const valid = await bcrypt.compare(currentPassword, currentUser.password);

      if (!valid) throw new ErrorResponse('Password incorrect', 401);

      // update password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      currentUser.password = hashedPassword;
    }

    // save user
    await currentUser.save();

    const returnUser = await this.userModel.findById(currentUser._id).populate({
      path: 'client',
      populate: {
        path: 'proposal',
      },
    });

    const payload = { username: returnUser.email, sub: returnUser._id };

    return {
      user: returnUser,
      success: true,
      token: this.jwtService.sign(payload),
    };
  }

  async cancelEmailUpdate(user: User) {
    user.newEmail = undefined;
    user.verifyEmailToken = undefined;

    await user.save();

    return {
      success: true,
      user,
    };
  }

  async sendVerifyUser(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new ErrorResponse('Could not complete sign up', 500);
    // generate token and hash
    const token = crypto.randomBytes(20).toString('hex');
    const hash = crypto.createHash('sha256').update(token).digest('hex');
    // add hash to user
    user.verifyUserToken = hash;
    // get base URL from request protocol and host domain
    const baseUrl = `${this.req.protocol}://${
      process.env.NODE_ENV === 'production'
        ? this.req.get('host')
        : 'localhost:3000'
    }`;
    const actionLink = `${baseUrl}/verify-user/${token}`;

    // send change email token to user via email
    await sendEmail({
      type: 'VERIFY_USER',
      actionLink,
      user,
      baseUrl,
      reason: `You have recieved this email because your email address was used to create an account at<span class="clear-footer-link" style="color: #474545; text-decoration: none;">ApexApps.com.au</span>, this is not a promotional email.`,
      buttonText: 'Verify Email',
    });

    await user.save();

    return {
      success: true,
      email,
    };
  }

  async findUserById(id: string) {
    let user;
    try {
      user = await this.userModel.findOne({ _id: id }).populate({
        path: 'client',
        populate: {
          path: 'proposal',
        },
      });
    } catch (err) {
      throw new ErrorResponse('Invalid signup link', 401);
    }
    if (!user || user.isVerified) {
      throw new ErrorResponse('Invalid signup link', 401);
    } else {
      return {
        success: true,
        foundUser: user,
      };
    }
  }

  async verifyUser(token: string) {
    // get hashed token
    const verifyUserToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');
    // find user with token
    let user;
    try {
      user = await this.userModel.findOne({ verifyUserToken }).populate({
        path: 'client',
        populate: {
          path: 'proposal',
        },
      });
    } catch (err) {
      throw new ErrorResponse(
        'Invalid email token, please request access to sign up',
        401,
      );
    }

    if (!user)
      throw new ErrorResponse(
        'Invalid email token, please request access to sign up',
        401,
      );

    // verify user
    user.isVerified = true;
    user.verifyUserToken = undefined;
    await user.save();

    const payload = { username: user.email, sub: user._id };

    return {
      success: true,
      user,
      token: this.jwtService.sign(payload),
    };
  }

  async verifyEmail(token: string) {
    // get hashed token
    const verifyEmailToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');
    // find user with token
    let user;
    try {
      user = await this.userModel.findOne({ verifyEmailToken }).populate({
        path: 'client',
        populate: {
          path: 'proposal',
        },
      });
    } catch (err) {
      throw new ErrorResponse('Invalid token', 401);
    }

    if (!user) throw new ErrorResponse('Invalid token', 401);

    // verify user
    user.email = user.newEmail;
    user.newEmail = undefined;
    user.verifyEmailToken = undefined;
    await user.save();

    const payload = { username: user.email, sub: user._id };

    return {
      success: true,
      user,
      token: this.jwtService.sign(payload),
    };
  }

  async forgotPassword(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user)
      throw new ErrorResponse('Could not find a user with that email', 404);

    // generate token and hash
    const token = crypto.randomBytes(20).toString('hex');
    const hash = crypto.createHash('sha256').update(token).digest('hex');
    // add hash to user
    user.resetPasswordToken = hash;
    user.resetPasswordExpire = moment().add(1, 'd').toDate();
    // get base URL from request protocol and host domain
    const baseUrl = `${this.req.protocol}://${
      process.env.NODE_ENV === 'production'
        ? this.req.get('host')
        : 'localhost:3000'
    }`;
    const actionLink = `${baseUrl}/reset-password/${token}`;

    // send change email token to user via email
    await sendEmail({
      type: 'RESET_PASSWORD',
      actionLink,
      user,
      baseUrl,
      reason: `You have recieved this email because your email address was used to create an account at<span class="clear-footer-link" style="color: #474545; text-decoration: none;">ApexApps.com.au</span>, this is not a promotional email.`,
      buttonText: 'Reset password',
    });

    await user.save();

    return {
      success: true,
      email,
    };
  }

  async resetPassword(token: string, password: string) {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await this.userModel
      .findOne({
        resetPasswordToken,
        resetPasswordExpire: {
          $gt: moment().toDate(),
        },
      })
      .populate({
        path: 'client',
        populate: {
          path: 'proposal',
        },
      });

    if (!user) {
      throw new ErrorResponse('Invalid password reset token', 401);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Set new password
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.isVerified = true;
    await user.save();

    const payload = { username: user.email, sub: user._id };
    return {
      success: true,
      user,
      token: this.jwtService.sign(payload),
    };
  }

  async setClient(clientName: string, user: User) {
    const client = await this.userModel
      .findOne({ clientName })
      .populate('projects');

    user.client = client;

    await user.save();

    return {
      success: true,
      user,
      client,
    };
  }
  async addProposal(user: User, addProposalDto: AddProposalDto) {
    if (!user.isAdmin)
      throw new ErrorResponse('User must be admin to access this content', 401);

    const { title, sections, videoLink, currentClient } = addProposalDto;

    const proposal = await this.proposalModel.create({
      title,
      sections,
      videoLink,
    });

    const proposals = await this.proposalModel.find();

    let returnUser = user;
    if (currentClient) {
      const client = await this.userModel.findById(user.client._id);

      proposal.withClient = true;

      await proposal.save();

      client.proposal = proposal;

      await client.save();

      returnUser = await this.userModel.findById(user._id).populate({
        path: 'client',
        populate: {
          path: 'proposal',
        },
      });
    }

    return {
      success: true,
      proposals,
      proposal,
      user: returnUser,
    };
  }

  async editProposal(user: User, proposal: AddProposalDto, proposalId: string) {
    if (!user.isAdmin)
      throw new ErrorResponse('User must be admin to access this content', 401);

    const { title, sections, videoLink, currentClient } = proposal;

    const foundProposal = await this.proposalModel.findById(proposalId);

    foundProposal.title = title;
    foundProposal.videoLink = videoLink;
    foundProposal.sections = sections;

    await foundProposal.save();

    let returnUser = user;
    if (currentClient) {
      const client = await this.userModel.findById(user.client._id);

      foundProposal.withClient = true;

      await foundProposal.save();

      client.proposal = foundProposal;

      await client.save();

      returnUser = await this.userModel.findById(user._id).populate({
        path: 'client',
        populate: {
          path: 'proposal',
        },
      });
    }

    const proposals = await this.proposalModel.find({ withClient: false });

    if (!foundProposal.withClient) proposals.unshift(foundProposal);

    return {
      success: true,
      proposals,
      proposal: foundProposal,
      user: returnUser,
    };
  }

  async getProposals(user: User) {
    if (!user.isAdmin)
      throw new ErrorResponse('User must be admin to access this content', 401);

    const client = await this.userModel
      .findById(user.client._id)
      .populate('proposal');

    const clientProposal = client.proposal;

    const proposals = await this.proposalModel.find({ withClient: false });

    if (clientProposal) proposals.unshift(clientProposal);

    return {
      success: true,
      proposals,
    };
  }

  async getProposal(user: User) {
    const client = await this.userModel
      .findById(user.client._id)
      .populate('proposal');

    const proposal = client.proposal ? client.proposal : undefined;

    return {
      success: true,
      proposal,
      user,
    };
  }

  async setProposal(user: User, proposalId: string) {
    if (!user.isAdmin)
      throw new ErrorResponse('User must be admin to access this content', 401);

    const proposal = await this.proposalModel.findById(proposalId);

    return {
      success: true,
      proposal,
    };
  }

  async getProposalById() {
    const { pid: proposalId } = this.req.params;
    let proposal;
    try {
      proposal = await this.proposalModel.findOne({ _id: proposalId });
    } catch (err) {
      throw new ErrorResponse('Invalid proposal link', 401);
    }
    if (!proposal) {
      throw new ErrorResponse('Invalid proposal link', 401);
    }
    return {
      success: true,
      proposal,
    };
  }

  async deleteProposal(user: User) {
    if (!user.isAdmin)
      throw new ErrorResponse('User must be admin to access this content', 401);

    const { pid: proposalId } = this.req.params;

    await this.proposalModel.findByIdAndDelete(proposalId);

    const client = await this.userModel
      .findById(user.client._id)
      .populate('proposal');

    const clientProposal = client.proposal;

    const proposals = await this.proposalModel.find({ withClient: false });

    if (clientProposal) proposals.unshift(clientProposal);

    return {
      success: true,
      proposals,
    };
  }

  async sendEmail(sendEmailDto: SendEmailDto) {
    const {
      name,
      email,
      contactEmail,
      projectTitle,
      projectDescription,
      emailComments,
    } = sendEmailDto;

    const baseUrl = `${this.req.protocol}://${
      process.env.NODE_ENV === 'production'
        ? this.req.get('host')
        : 'localhost:3000'
    }`;

    await sendEmail({
      type: 'CONTACT',
      baseUrl,
      fromEmail: email,
      contactEmail,
      name,
      reason: ``,
      projectTitle,
      projectDescription,
      emailComments,
    });
    return {
      success: true,
    };
  }

  async bookCall(bookCallDto: BookCallDto) {
    const {
      name,
      email,
      contactEmail,
      projectTitle,
      projectDescription,
      contactMethod,
      phone,
      zoomName,
      callTime: submittedCalltime,
      userCallTime,
    } = bookCallDto;

    const callTime = moment
      .tz(
        moment(submittedCalltime, 'HH:mm DD-MM-YYYY ZZ'),
        'Australia/Melbourne',
      )
      .toDate();

    const foundBookingByTime = await this.bookingModel.findOne({
      callTime,
    });

    if (foundBookingByTime)
      throw new ErrorResponse(
        'Booking time unavailable, please select another time',
        400,
      );

    const foundBookingByEmail = await this.bookingModel.find({ email });

    const futureBooking = foundBookingByEmail.find(
      (booking) =>
        booking.callTime > moment.tz(moment(), 'Australia/Melbourne').toDate(),
    );

    if (futureBooking)
      throw new ErrorResponse(
        'You have already submitted a call booking request. You will recieve a confirmation email as soon as possible.',
        400,
      );

    const booking = await this.bookingModel.create({
      name,
      email,
      contactEmail,
      projectTitle,
      projectDescription,
      contactMethod,
      phone,
      zoomName,
      callTime,
      userCallTime,
    });
    const baseUrl = `${this.req.protocol}://${
      process.env.NODE_ENV === 'production'
        ? this.req.get('host')
        : 'localhost:3000'
    }`;
    const actionLink = `${baseUrl}/confirm-booking/${booking._id}`;

    await sendEmail({
      type: 'BOOKING',
      baseUrl,
      fromEmail: email,
      contactEmail,
      name,
      reason: ``,
      projectTitle,
      projectDescription,
      buttonText: 'Confirm booking',
      actionLink,
      contactMethod,
      phone,
      zoomName,
      callTime: moment
        .tz(
          moment(submittedCalltime, 'HH:mm DD-MM-YYYY ZZ'),
          'Australia/Melbourne',
        )
        .format('h:mma D-MMM-YY'),
    });

    const bookings = await this.bookingModel.find({
      callTime: {
        $gte: moment.tz(moment(), 'Australia/Melbourne').toDate(),
        $lte: moment.tz(moment(), 'Australia/Melbourne').add(3, 'd').toDate(),
      },
    });

    return {
      success: true,
      bookings,
    };
  }

  async getBookings() {
    const bookings = await this.bookingModel.find({
      callTime: {
        $gte: moment.tz(moment(), 'Australia/Melbourne').toDate(),
        $lte: moment.tz(moment(), 'Australia/Melbourne').add(3, 'd').toDate(),
      },
    });

    return {
      success: true,
      bookings,
    };
  }

  async confirmBooking(bookingId: string, zoomLink: string) {
    let booking;
    try {
      booking = await this.bookingModel.findById(bookingId);
    } catch (err) {
      throw new ErrorResponse('Invalid booking Id, please try again', 401);
    }

    if (!booking)
      throw new ErrorResponse('Invalid booking Id, please try again', 401);

    // confirm booking
    booking.confirmed = true;
    await booking.save();

    const baseUrl = `${this.req.protocol}://${
      process.env.NODE_ENV === 'production'
        ? this.req.get('host')
        : 'localhost:3000'
    }`;

    await sendEmail({
      type: 'CONFIRM_BOOKING',
      baseUrl,
      toEmail: booking.contactEmail,
      name: booking.name,
      reason: `You have recieved this email to confirm a call booking made at <span class="clear-footer-link" style="color: #474545; text-decoration: none;">ApexApps.com.au</span>, this is not a promotional email.`,
      projectTitle: booking.projectTitle,
      projectDescription: booking.projectDescription,
      contactMethod: booking.contactMethod,
      phone: booking.phone,
      zoomName: booking.zoomName,
      userCallTime: booking.userCallTime,
      zoomLink,
    });

    return {
      success: true,
    };
  }
}
