import { PartialType } from '@nestjs/mapped-types';
import { CreateMeetUpRequestDto } from './create-meet-up-request.dto';

export class UpdateMeetUpRequestDto extends PartialType(CreateMeetUpRequestDto) {}
