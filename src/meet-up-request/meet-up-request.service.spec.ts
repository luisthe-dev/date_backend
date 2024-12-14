import { Test, TestingModule } from '@nestjs/testing';
import { MeetUpRequestService } from './meet-up-request.service';

describe('MeetUpRequestService', () => {
  let service: MeetUpRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeetUpRequestService],
    }).compile();

    service = module.get<MeetUpRequestService>(MeetUpRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
