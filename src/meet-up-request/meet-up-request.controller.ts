import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MeetUpRequestService } from './meet-up-request.service';
import { CreateMeetUpRequestDto } from './dto/create-meet-up-request.dto';
import { UpdateMeetUpRequestDto } from './dto/update-meet-up-request.dto';

@Controller('meet-up-request')
export class MeetUpRequestController {
  constructor(private readonly meetUpRequestService: MeetUpRequestService) {}

  @Post()
  create(@Body() createMeetUpRequestDto: CreateMeetUpRequestDto) {
    return this.meetUpRequestService.create(createMeetUpRequestDto);
  }

  @Get()
  findAll() {
    return this.meetUpRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meetUpRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeetUpRequestDto: UpdateMeetUpRequestDto) {
    return this.meetUpRequestService.update(+id, updateMeetUpRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meetUpRequestService.remove(+id);
  }
}
