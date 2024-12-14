import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PreferenceChoiceService } from './preference-choice.service';
import { CreatePreferenceChoiceDto } from './dto/create-preference-choice.dto';
import { UpdatePreferenceChoiceDto } from './dto/update-preference-choice.dto';

@Controller('preference-choice')
export class PreferenceChoiceController {
  constructor(private readonly preferenceChoiceService: PreferenceChoiceService) {}

  @Post()
  create(@Body() createPreferenceChoiceDto: CreatePreferenceChoiceDto) {
    return this.preferenceChoiceService.create(createPreferenceChoiceDto);
  }

  @Get()
  findAll() {
    return this.preferenceChoiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preferenceChoiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePreferenceChoiceDto: UpdatePreferenceChoiceDto) {
    return this.preferenceChoiceService.update(+id, updatePreferenceChoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preferenceChoiceService.remove(+id);
  }
}
