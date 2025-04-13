import { Injectable } from '@nestjs/common';
import {
  PaginatedServiceResponseBuild,
  ResponsesHelper,
  ServiceResponseBuild,
} from 'src/helpers/responses';
import { Repository } from 'typeorm';
import { UserPreference } from './entities/user-preference.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationRequestDto } from 'src/helpers/dtos/pagination-request.dto';
import { User } from 'src/user/entities/user.entity';
import { UpdateUserPreferenceDto } from './dto/update-user-preference.dto';
import { Preference } from 'src/preference/entities/preference.entity';
import { PreferenceChoice } from 'src/preference-choice/entities/preference-choice.entity';

@Injectable()
export class UserPreferenceService {
  constructor(
    @InjectRepository(UserPreference)
    private readonly userPreferenceRepository: Repository<UserPreference>,
    @InjectRepository(Preference)
    private readonly preferenceRepository: Repository<Preference>,
    @InjectRepository(PreferenceChoice)
    private readonly preferenceChoiceRepository: Repository<PreferenceChoice>,
    private readonly responseHelper: ResponsesHelper,
  ) {}

  getUserPreferences = async (
    user: User,
    pagination: PaginationRequestDto,
  ): Promise<ServiceResponseBuild> => {
    const preferences = await this.preferenceRepository.find({});

    for (const preference of preferences) {
      const choiceStatus = [];

      const preferenceChoices = await this.preferenceChoiceRepository.find({
        where: {
          preference: { id: preference.id },
        },
      });

      for (const choice of preferenceChoices) {
        const userPreference = await this.userPreferenceRepository.findOne({
          where: {
            user: { id: user.id },
            preference: { id: preference.id },
            preferenceChoice: { id: choice.id },
          },
        });

        if (userPreference) {
          choiceStatus.push({
            id: choice.id,
            label: choice.value,
            status: true,
          });
        } else {
          choiceStatus.push({
            id: choice.id,
            label: choice.value,
            status: false,
          });
        }
      }

      preference.preference_choices = choiceStatus;
    }

    return this.responseHelper.buildServiceResponse(
      preferences,
      'User Preferences Fetched Successfully',
    );
  };

  updateUserPreference = async (
    user: User,
    updatePreference: UpdateUserPreferenceDto,
  ): Promise<ServiceResponseBuild> => {
    const existingPreference = await this.userPreferenceRepository.findOne({
      where: {
        user: { id: user.id },
        preference: { id: updatePreference.preferenceId },
        preferenceChoice: { id: updatePreference.choiceId },
      },
    });

    if (existingPreference) {
      await this.userPreferenceRepository.delete(existingPreference.id);
    } else {
      const preference = await this.preferenceRepository.findOne({
        where: {
          id: updatePreference.preferenceId,
        },
      });

      const preferenceChoice = await this.preferenceChoiceRepository.findOne({
        where: {
          id: updatePreference.choiceId,
          preference: { id: updatePreference.preferenceId },
        },
      });
      if (!preference || !preferenceChoice) {
        return this.responseHelper.buildServiceResponse(
          [],
          'Preference or Preference Choice not found',
        );
      }
      const userPreference = this.userPreferenceRepository.create({
        user: user,
        preference: preference,
        preferenceChoice: preferenceChoice,
      });

      await this.userPreferenceRepository.save(userPreference);
    }

    return this.responseHelper.buildServiceResponse(
      [],
      'User Preferences Updated Successfully',
    );
  };
}
