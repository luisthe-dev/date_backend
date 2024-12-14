import { Module } from '@nestjs/common';
import { OneTimeTokenService } from './one-time-token.service';
import { OneTimeTokenController } from './one-time-token.controller';

@Module({
  controllers: [OneTimeTokenController],
  providers: [OneTimeTokenService],
})
export class OneTimeTokenModule {}
