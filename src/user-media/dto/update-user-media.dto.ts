import { PartialType } from '@nestjs/mapped-types';
import { CreateUserMediaDto } from './create-user-media.dto';

export class UpdateUserMediaDto extends PartialType(CreateUserMediaDto) {}
