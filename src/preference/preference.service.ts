import { Injectable } from '@nestjs/common';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Preference } from './entities/preference.entity';
import { Repository } from 'typeorm';
import { PreferenceChoice } from 'src/preference-choice/entities/preference-choice.entity';
import { UserPreference } from 'src/user-preference/entities/user-preference.entity';
import {
  PaginatedServiceResponseBuild,
  ResponsesHelper,
} from 'src/helpers/responses';
import { PaginationRequestDto } from 'src/helpers/dtos/pagination-request.dto';

@Injectable()
export class PreferenceService {
  constructor(
    @InjectRepository(Preference)
    private readonly preferenceRepository: Repository<Preference>,
    @InjectRepository(PreferenceChoice)
    private readonly preferenceChoiceRespoitory: Repository<PreferenceChoice>,
    @InjectRepository(UserPreference)
    private readonly userPreferenceRepository: Repository<UserPreference>,
    private readonly responseHelper: ResponsesHelper,
  ) {}

  async create(createPreferenceDto: CreatePreferenceDto) {
    const preference = this.preferenceRepository.create({
      title: createPreferenceDto.title,
    });

    await this.preferenceRepository.save(preference);

    const preferenceChoices = [];

    createPreferenceDto.choices.forEach(async (choice) => {
      const preferenceChoice = this.preferenceChoiceRespoitory.create({
        preference: preference,
        value: choice,
      });

      await this.preferenceChoiceRespoitory.save(preferenceChoice);

      preferenceChoices.push(preferenceChoice);
    });

    return this.responseHelper.buildServiceResponse(
      preference,
      'Preference Created Successfully',
    );
  }

  async findAll(
    pagination: PaginationRequestDto,
  ): Promise<PaginatedServiceResponseBuild> {
    const preferences = await this.preferenceRepository.find({
      order: {
        id: 'DESC',
      },
      relations: {
        preference_choices: true,
      },
      skip: (pagination.limit * (pagination.page - 1)) || 0,
      take: pagination.limit || 20,
    });

    const total_count = await this.preferenceRepository.count();

    return this.responseHelper.buildPaginatedServiceResponse(
      preferences,
      total_count,
      'Preferences Fetched Successfully',
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} preference`;
  }

  update(id: number, updatePreferenceDto: UpdatePreferenceDto) {
    return `This action updates a #${id} preference`;
  }

  remove(id: number) {
    return `This action removes a #${id} preference`;
  }
}
