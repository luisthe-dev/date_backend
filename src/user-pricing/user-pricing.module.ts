import { Module } from '@nestjs/common';
import { UserPricingService } from './user-pricing.service';
import { UserPricingController } from './user-pricing.controller';

@Module({
  controllers: [UserPricingController],
  providers: [UserPricingService],
})
export class UserPricingModule {}
