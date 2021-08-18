import * as crypto from 'crypto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

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

      // --- TO DO --- //
      // send change email token to user via email
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
      user,
      success: true,
      token: this.jwtService.sign(payload),
    };
  }
}
