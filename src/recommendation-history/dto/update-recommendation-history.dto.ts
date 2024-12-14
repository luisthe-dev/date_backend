import { PartialType } from '@nestjs/mapped-types';
import { CreateRecommendationHistoryDto } from './create-recommendation-history.dto';

export class UpdateRecommendationHistoryDto extends PartialType(CreateRecommendationHistoryDto) {}
