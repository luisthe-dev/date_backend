import { Injectable } from '@nestjs/common';
import { CreateRecommendationHistoryDto } from './dto/create-recommendation-history.dto';
import { UpdateRecommendationHistoryDto } from './dto/update-recommendation-history.dto';

@Injectable()
export class RecommendationHistoryService {
  create(createRecommendationHistoryDto: CreateRecommendationHistoryDto) {
    return 'This action adds a new recommendationHistory';
  }

  findAll() {
    return `This action returns all recommendationHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recommendationHistory`;
  }

  update(id: number, updateRecommendationHistoryDto: UpdateRecommendationHistoryDto) {
    return `This action updates a #${id} recommendationHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} recommendationHistory`;
  }
}
