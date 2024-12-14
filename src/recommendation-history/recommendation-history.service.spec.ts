import { Test, TestingModule } from '@nestjs/testing';
import { RecommendationHistoryService } from './recommendation-history.service';

describe('RecommendationHistoryService', () => {
  let service: RecommendationHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecommendationHistoryService],
    }).compile();

    service = module.get<RecommendationHistoryService>(RecommendationHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
