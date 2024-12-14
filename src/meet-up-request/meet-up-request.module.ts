import { Module } from '@nestjs/common';
import { MeetUpRequestService } from './meet-up-request.service';
import { MeetUpRequestController } from './meet-up-request.controller';

@Module({
  controllers: [MeetUpRequestController],
  providers: [MeetUpRequestService],
})
export class MeetUpRequestModule {}
