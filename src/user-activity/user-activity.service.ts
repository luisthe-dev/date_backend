import { Injectable } from '@nestjs/common';
import { PaginatedServiceResponseBuild, ResponsesHelper, ServiceResponseBuild } from 'src/helpers/responses';
import { User } from 'src/user/entities/user.entity';
import { ActivityData } from './dto/activity-data.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserActivity } from './entities/user-activity.entity';
import { Repository } from 'typeorm';
import { PaginationRequestDto } from 'src/helpers/dtos/pagination-request.dto';

@Injectable()
export class UserActivityService {
  constructor(
    @InjectRepository(UserActivity)
    private readonly userActivityRepository: Repository<UserActivity>,
    private readonly responseHelper: ResponsesHelper,
  ) {}

  async createUserActivityRecord(
    user: User,
    activityData: ActivityData,
  ): Promise<ServiceResponseBuild> {
    
    delete user.password;

    const newActivity = this.userActivityRepository.create({
      log: activityData.logEntry,
      user: user,
    });

    await this.userActivityRepository.save(newActivity, { reload: true });

    return this.responseHelper.buildServiceResponse(
      {},
      'User Activity Recorded Successfully',
    );
  }

  async getUserActivity(
    user: User,
    pagination: PaginationRequestDto,
  ): Promise<PaginatedServiceResponseBuild> {
    const userActivity = await this.userActivityRepository.find({
      order: {
        id: 'DESC',
      },
      relations: {
        user: true,
      },
      where: { user: { id: user.id } },
      skip: pagination.limit * (pagination.page - 1) || 0,
      take: pagination.limit || 20,
    });

    const total_count = await this.userActivityRepository.count({
      where: { user: { id: user.id } },
      relations: {
        user: true,
      },
    });

    return this.responseHelper.buildPaginatedServiceResponse(
      userActivity,
      total_count,
      'User Activity Fetched Successfully',
    );
  }
}
