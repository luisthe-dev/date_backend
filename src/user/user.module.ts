import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { OneTimeTokenService } from 'src/one-time-token/one-time-token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ResponsesHelper } from 'src/helpers/responses';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, OneTimeTokenService, ResponsesHelper],
})
export class UserModule {}
