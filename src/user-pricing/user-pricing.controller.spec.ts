import { Test, TestingModule } from '@nestjs/testing';
import { UserPricingController } from './user-pricing.controller';
import { UserPricingService } from './user-pricing.service';

describe('UserPricingController', () => {
  let controller: UserPricingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPricingController],
      providers: [UserPricingService],
    }).compile();

    controller = module.get<UserPricingController>(UserPricingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
