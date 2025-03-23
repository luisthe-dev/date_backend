import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponsesHelper } from 'src/helpers/responses';
import { UtilsHelper } from 'src/helpers/utils';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [ResponsesHelper, UtilsHelper],
  exports: [ResponsesHelper, UtilsHelper],
})
export class HelpersModule {}
