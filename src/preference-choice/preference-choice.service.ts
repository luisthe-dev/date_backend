import { Injectable } from '@nestjs/common';
import { CreatePreferenceChoiceDto } from './dto/create-preference-choice.dto';
import { UpdatePreferenceChoiceDto } from './dto/update-preference-choice.dto';

@Injectable()
export class PreferenceChoiceService {
  create(createPreferenceChoiceDto: CreatePreferenceChoiceDto) {
    return 'This action adds a new preferenceChoice';
  }

  findAll() {
    return `This action returns all preferenceChoice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} preferenceChoice`;
  }

  update(id: number, updatePreferenceChoiceDto: UpdatePreferenceChoiceDto) {
    return `This action updates a #${id} preferenceChoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} preferenceChoice`;
  }
}
