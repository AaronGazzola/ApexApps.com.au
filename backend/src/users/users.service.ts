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
import * as moment from 'moment';
import ErrorResponse from 'src/shared/errorResponse';

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
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
        user,
        baseUrl,
        reason: `You have recieved this email because a request was made to update the email address associated with your account at <span class="clear-footer-link" style="color: #474545; text-decoration: none;">ApexApps.dev</span>, this is not a promotional email.`,
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
    const returnUser = await currentUser.save();

    const payload = { username: returnUser.email, sub: returnUser._id };

    return {
      user: returnUser,
      success: true,
      token: this.jwtService.sign(payload),
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
      reason: `You have recieved this email because your email address was used to create an account AuthGuard <span class="clear-footer-link" style="color: #474545; text-decoration: none;">ApexApps.dev</span>, this is not a promotional email.`,
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
      user = await this.userModel.findOne({ _id: id });
    } catch (err) {
      throw new ErrorResponse('Invalid signup link', 401);
    }
    if (!user) {
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
      user = await this.userModel.findOne({ verifyUserToken });
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
      user = await this.userModel.findOne({ verifyEmailToken });
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
      reason: `You have recieved this email because your email address was used to create an account AuthGuard <span class="clear-footer-link" style="color: #474545; text-decoration: none;">ApexApps.dev</span>, this is not a promotional email.`,
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

    const user = await this.userModel.findOne({
      resetPasswordToken,
      resetPasswordExpire: {
        $gt: moment().toDate(),
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
}
