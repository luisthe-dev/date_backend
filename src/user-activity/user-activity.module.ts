import { Module } from '@nestjs/common';
import { UserActivityService } from './user-activity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserActivity } from './entities/user-activity.entity';
import { ResponsesHelper } from 'src/helpers/responses';

@Module({
  imports: [TypeOrmModule.forFeature([UserActivity])],
  controllers: [],
  providers: [UserActivityService, ResponsesHelper],
})
export class UserActivityModule {}
