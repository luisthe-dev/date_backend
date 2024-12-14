import { Injectable } from '@nestjs/common';
import { CreateMeetUpRequestDto } from './dto/create-meet-up-request.dto';
import { UpdateMeetUpRequestDto } from './dto/update-meet-up-request.dto';

@Injectable()
export class MeetUpRequestService {
  create(createMeetUpRequestDto: CreateMeetUpRequestDto) {
    return 'This action adds a new meetUpRequest';
  }

  findAll() {
    return `This action returns all meetUpRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meetUpRequest`;
  }

  update(id: number, updateMeetUpRequestDto: UpdateMeetUpRequestDto) {
    return `This action updates a #${id} meetUpRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} meetUpRequest`;
  }
}
