import { Module } from '@nestjs/common';
import { PreferenceService } from './preference.service';
import { PreferenceController } from './preference.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Preference } from './entities/preference.entity';
import { PreferenceChoice } from 'src/preference-choice/entities/preference-choice.entity';
import { UserPreference } from 'src/user-preference/entities/user-preference.entity';
import { ResponsesHelper } from 'src/helpers/responses';

@Module({
  imports: [TypeOrmModule.forFeature([Preference, PreferenceChoice, UserPreference])],
  controllers: [PreferenceController],
  providers: [PreferenceService, ResponsesHelper],
})
export class PreferenceModule {}
