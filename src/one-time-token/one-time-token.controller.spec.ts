import { Test, TestingModule } from '@nestjs/testing';
import { OneTimeTokenController } from './one-time-token.controller';
import { OneTimeTokenService } from './one-time-token.service';

describe('OneTimeTokenController', () => {
  let controller: OneTimeTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OneTimeTokenController],
      providers: [OneTimeTokenService],
    }).compile();

    controller = module.get<OneTimeTokenController>(OneTimeTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
