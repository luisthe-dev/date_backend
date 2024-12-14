import { Test, TestingModule } from '@nestjs/testing';
import { RecommendationHistoryController } from './recommendation-history.controller';
import { RecommendationHistoryService } from './recommendation-history.service';

describe('RecommendationHistoryController', () => {
  let controller: RecommendationHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecommendationHistoryController],
      providers: [RecommendationHistoryService],
    }).compile();

    controller = module.get<RecommendationHistoryController>(RecommendationHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
