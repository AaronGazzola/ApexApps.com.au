import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';

import { UserSeed } from '../auth/seeds/user.seed';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [CommandModule, 
    AuthModule],
    providers: [UserSeed],
    exports: [UserSeed],
})
export class SeedsModule {}