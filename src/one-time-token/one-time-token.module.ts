import { Module } from '@nestjs/common';
import { OneTimeTokenService } from './one-time-token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { OneTimeToken } from './entities/one-time-token.entity';
import { ResponsesHelper } from 'src/helpers/responses';
import { UtilsHelper } from 'src/helpers/utils';
import { UserService } from 'src/user/user.service';
import { UserActivityService } from 'src/user-activity/user-activity.service';
import { UserActivity } from 'src/user-activity/entities/user-activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, OneTimeToken, UserActivity])],
  controllers: [],
  providers: [
    OneTimeTokenService,
    UserService,
    ResponsesHelper,
    UtilsHelper,
    UserActivityService
  ],
})
export class OneTimeTokenModule {}