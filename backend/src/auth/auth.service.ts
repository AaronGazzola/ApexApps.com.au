import { SeedUserDto } from './dto/seed-user.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { SignupUserDto } from './dto/signup-user.dto';
import { User } from '../users/interfaces/user.interface';
import ErrorResponse from 'src/shared/errorResponse';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signupUserDto: SignupUserDto) {
    const { userName, password, email, id } = signupUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.findById(id);

    user.email = email;
    user.userName = userName;
    user.password = hashedPassword;

    const payload = { username: email, sub: id };

    try {
      await user.save();
      const returnUser = await this.userModel.findById(user._id);
      return {
        user: returnUser,
        success: true,
        token: this.jwtService.sign(payload),
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      return new ErrorResponse('Could not sign up, please try again', 401);
    }
  }

  async seedUser(seedUserDto: SeedUserDto): Promise<void> {
    const { userName, password, email, isAdmin, isVerified } = seedUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({
      userName,
      password: hashedPassword,
      email,
      isAdmin,
      isVerified,
    });

    try {
      await user.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      throw error;
    }
  }

  async login(user: User) {
    if (!user.isVerified)
      throw new ErrorResponse(
        'Pleae check your inbox to verify your email',
        401,
      );

    const payload = { username: user.email, sub: user._id };

    return {
      user,
      success: true,
      token: this.jwtService.sign(payload),
    };
  }

  async getUser(_id: string) {
    try {
      const user = await this.userModel.findById(_id).populate({
        path: 'client',
        populate: {
          path: 'proposal',
        },
      });

      if (!user) {
        throw new ErrorResponse('No user found', 404);
      }
      const payload = { username: user.email, sub: user._id };
      return {
        user,
        client: user.client,
        success: true,
        token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new ErrorResponse(error.message, 500);
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).select('+password');

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);

    const returnUser = await this.userModel.findById(user._id).populate({
      path: 'client',
      populate: {
        path: 'proposal',
      },
    });

    if (valid) {
      return returnUser;
    }

    return null;
  }
}
