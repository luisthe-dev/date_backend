import { Test, TestingModule } from '@nestjs/testing';
import { RequestLogController } from './request-log.controller';
import { RequestLogService } from './request-log.service';

describe('RequestLogController', () => {
  let controller: RequestLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestLogController],
      providers: [RequestLogService],
    }).compile();

    controller = module.get<RequestLogController>(RequestLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
