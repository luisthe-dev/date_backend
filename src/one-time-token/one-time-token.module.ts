import { Module } from '@nestjs/common';
import { OneTimeTokenService } from './one-time-token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { OneTimeToken } from './entities/one-time-token.entity';
import { ResponsesHelper } from 'src/helpers/responses';
import { UtilsHelper } from 'src/helpers/utils';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, OneTimeToken])],
  controllers: [],
  providers: [OneTimeTokenService, UserService, ResponsesHelper, UtilsHelper],
})
export class OneTimeTokenModule {}
