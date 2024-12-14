import { Module } from '@nestjs/common';
import { RecommendationHistoryService } from './recommendation-history.service';
import { RecommendationHistoryController } from './recommendation-history.controller';

@Module({
  controllers: [RecommendationHistoryController],
  providers: [RecommendationHistoryService],
})
export class RecommendationHistoryModule {}
