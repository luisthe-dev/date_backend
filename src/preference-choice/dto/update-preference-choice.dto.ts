import { PartialType } from '@nestjs/mapped-types';
import { CreatePreferenceChoiceDto } from './create-preference-choice.dto';

export class UpdatePreferenceChoiceDto extends PartialType(CreatePreferenceChoiceDto) {}
