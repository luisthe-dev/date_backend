import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecommendationHistoryService } from './recommendation-history.service';
import { CreateRecommendationHistoryDto } from './dto/create-recommendation-history.dto';
import { UpdateRecommendationHistoryDto } from './dto/update-recommendation-history.dto';

@Controller('recommendation-history')
export class RecommendationHistoryController {
  constructor(private readonly recommendationHistoryService: RecommendationHistoryService) {}

  @Post()
  create(@Body() createRecommendationHistoryDto: CreateRecommendationHistoryDto) {
    return this.recommendationHistoryService.create(createRecommendationHistoryDto);
  }

  @Get()
  findAll() {
    return this.recommendationHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recommendationHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecommendationHistoryDto: UpdateRecommendationHistoryDto) {
    return this.recommendationHistoryService.update(+id, updateRecommendationHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recommendationHistoryService.remove(+id);
  }
}
