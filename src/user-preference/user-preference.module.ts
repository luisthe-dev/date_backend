import { Module } from '@nestjs/common';
import { UserPreferenceService } from './user-preference.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPreference } from './entities/user-preference.entity';
import { ResponsesHelper } from 'src/helpers/responses';
import { Preference } from 'src/preference/entities/preference.entity';
import { PreferenceChoice } from 'src/preference-choice/entities/preference-choice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserPreference, Preference, PreferenceChoice])],
  controllers: [],
  providers: [UserPreferenceService, ResponsesHelper],
})
export class UserPreferenceModule {}
