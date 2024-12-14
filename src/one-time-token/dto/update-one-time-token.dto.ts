import { PartialType } from '@nestjs/mapped-types';
import { CreateOneTimeTokenDto } from './create-one-time-token.dto';

export class UpdateOneTimeTokenDto extends PartialType(CreateOneTimeTokenDto) {}
