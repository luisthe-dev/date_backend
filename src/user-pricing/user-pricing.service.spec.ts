import { Test, TestingModule } from '@nestjs/testing';
import { UserPricingService } from './user-pricing.service';

describe('UserPricingService', () => {
  let service: UserPricingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPricingService],
    }).compile();

    service = module.get<UserPricingService>(UserPricingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
