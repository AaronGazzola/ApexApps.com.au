import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

import { AuthService } from '../auth.service';

@Injectable()
export class UserSeed {
  constructor(private readonly authService: AuthService) {}

  @Command({
    command: 'create:user',
    describe: 'create a user',
    autoExit: true,
  })
  async create() {
    await this.authService.seedUser({
      userName: 'Aaron Gazzola',
      email: 'aaron@apexapps.com.au',
      password: process.env.USER_PASSWORD,
      isAdmin: true,
      isVerified: true,
    });
  }
}
