import { Module } from '@nestjs/common';
import { OneTimeTokenService } from './one-time-token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { OneTimeToken } from './entities/one-time-token.entity';
import { ResponsesHelper } from 'src/helpers/responses';
import { UtilHelper } from 'src/helpers/util';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, OneTimeToken])],
  controllers: [],
  providers: [OneTimeTokenService, UserService, ResponsesHelper, UtilHelper],
})
export class OneTimeTokenModule {}
