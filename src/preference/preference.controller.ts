import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PreferenceService } from './preference.service';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';

@Controller('preference')
export class PreferenceController {
  constructor(private readonly preferenceService: PreferenceService) {}

  @Post()
  create(@Body() createPreferenceDto: CreatePreferenceDto) {
    return this.preferenceService.create(createPreferenceDto);
  }

  @Get()
  findAll() {
    return this.preferenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preferenceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePreferenceDto: UpdatePreferenceDto) {
    return this.preferenceService.update(+id, updatePreferenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preferenceService.remove(+id);
  }
}
