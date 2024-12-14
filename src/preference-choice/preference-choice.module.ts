import { Module } from '@nestjs/common';
import { PreferenceChoiceService } from './preference-choice.service';
import { PreferenceChoiceController } from './preference-choice.controller';

@Module({
  controllers: [PreferenceChoiceController],
  providers: [PreferenceChoiceService],
})
export class PreferenceChoiceModule {}
