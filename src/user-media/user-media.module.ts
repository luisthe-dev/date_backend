import { Module } from '@nestjs/common';
import { UserMediaService } from './user-media.service';
import { UserMediaController } from './user-media.controller';

@Module({
  controllers: [UserMediaController],
  providers: [UserMediaService],
})
export class UserMediaModule {}
