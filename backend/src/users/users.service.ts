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

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
    @Inject(REQUEST) private readonly req: Request,
  ) {}

  async addUser(name: string, _id: string) {
    const user = await this.userModel.findById(_id);
    if (!user?.isAdmin)
      throw Error('User must be admin to access this content');
    await this.userModel.create({ clientName: name });
    return { success: true };
  }

  async updateClient(updateClientDto: UpdateClientDto, userId: string) {
    const { clientName, id: clientId } = updateClientDto;
    const user = await this.userModel.findById(userId);
    if (!user?.isAdmin)
      throw Error('User must be admin to access this content');
    const client = await this.userModel.findById(clientId);
    client.clientName = clientName;
    await client.save();

    return { success: true };
  }

  async getUsers(_id: string) {
    const user = await this.userModel.findById(_id);
    if (!user?.isAdmin)
      throw Error('User must be admin to access this content');
    const users = await this.userModel.find({ isAdmin: false });
    return {
      success: true,
      users,
    };
  }

  async updateUser(updateUserDto: UpdateUserDto, _id: string) {
    const {
      userName,
      email: updateEmail,
      currentPassword,
      newPassword,
    } = updateUserDto;
    const email = updateEmail.toLowerCase();
    const user = await this.userModel.findById(_id).select('+password');
    if (!user) {
      throw new Error('No user found');
    }
    // update name
    user.userName = userName;

    // update email
    if (user.email !== email) {
      // check for user with new email
      const foundUser = await this.userModel.findOne({
        email,
      });
      if (foundUser) {
        throw new Error('A user with that email already exists');
      }
      // add new email to model
      user.newEmail = email;
      // generate token and hash
      const token = crypto.randomBytes(20).toString('hex');
      const hash = crypto.createHash('sha256').update(token).digest('hex');
      // add hash to user
      user.verifyEmailToken = hash;

      // get base URL from request protocol and host domain
      const baseUrl = `${this.req.protocol}://${
        process.env.NODE_ENV === 'production'
          ? this.req.get('host')
          : 'localhost:3000'
      }`;
      const actionLink = `${baseUrl}/verifyemail/${token}`;

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

    // update password
    if (currentPassword && newPassword) {
      // check if current password is valid
      const valid = await bcrypt.compare(currentPassword, user.password);
      if (!valid) throw new Error('Password incorrect');
      // update password
      const password = await bcrypt.hash(newPassword, 10);
      user.password = password;
    }

    // save user
    const returnUser = await user.save();

    const payload = { username: user.email, sub: user._id };

    return {
      user: returnUser,
      success: true,
      token: this.jwtService.sign(payload),
    };
  }
}
