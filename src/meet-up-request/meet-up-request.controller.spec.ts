import { Test, TestingModule } from '@nestjs/testing';
import { MeetUpRequestController } from './meet-up-request.controller';
import { MeetUpRequestService } from './meet-up-request.service';

describe('MeetUpRequestController', () => {
  let controller: MeetUpRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeetUpRequestController],
      providers: [MeetUpRequestService],
    }).compile();

    controller = module.get<MeetUpRequestController>(MeetUpRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
