import { Module } from '@nestjs/common';
import { UserMediaService } from './user-media.service';
import { MulterModule } from '@nestjs/platform-express';
import { ResponsesHelper } from 'src/helpers/responses';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMedia } from './entities/user-media.entity';

@Module({
  imports: [
    MulterModule.register({ dest: '../storage/userMedias' }),
    TypeOrmModule.forFeature([UserMedia]),
  ],
  controllers: [],
  providers: [UserMediaService, ResponsesHelper],
})
export class UserMediaModule {}
