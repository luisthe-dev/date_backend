import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { OneTimeTokenService } from 'src/one-time-token/one-time-token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ResponsesHelper } from 'src/helpers/responses';
import { OneTimeToken } from 'src/one-time-token/entities/one-time-token.entity';
import { UtilsHelper } from 'src/helpers/utils';
import { UserActivityService } from 'src/user-activity/user-activity.service';
import { UserActivity } from 'src/user-activity/entities/user-activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, OneTimeToken, UserActivity])],
  controllers: [UserController],
  providers: [
    UserService,
    OneTimeTokenService,
    ResponsesHelper,
    UtilsHelper,
    UserActivityService,
  ],
})
export class UserModule {}
