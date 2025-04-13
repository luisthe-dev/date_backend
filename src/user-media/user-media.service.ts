import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { PaginationRequestDto } from 'src/helpers/dtos/pagination-request.dto';
import {
  PaginatedServiceResponseBuild,
  ResponsesHelper,
  ServiceResponseBuild,
} from 'src/helpers/responses';
import { Repository } from 'typeorm';
import { UserMedia } from './entities/user-media.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserMediaService {
  constructor(
    @InjectRepository(UserMedia)
    private readonly userMediaRepository: Repository<UserMedia>,
    private readonly responseHelper: ResponsesHelper,
  ) {}

  getUserMedia = async (
    user: User,
    pagination: PaginationRequestDto,
  ): Promise<PaginatedServiceResponseBuild> => {
    const userMedia = await this.userMediaRepository.find({
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

    const total_count = await this.userMediaRepository.count({
      where: { user: { id: user.id } },
      relations: {
        user: true,
      },
    });

    return this.responseHelper.buildPaginatedServiceResponse(
      userMedia,
      total_count,
      'User Media Fetched Successfully',
    );
  };

  uploadUserMedia = async (
    user: User,
    medias: Express.Multer.File[],
  ): Promise<ServiceResponseBuild> => {
    const userMedias: UserMedia[] = [];

    for (const media of medias) {
      const userMedia = this.userMediaRepository.create({
        mediaType: media.mimetype,
        mediaUrl: media.path,
        user: user,
      });

      await this.userMediaRepository.save(userMedia);

      userMedias.push(userMedia);
    }

    return this.responseHelper.buildServiceResponse(
      userMedias,
      'User Media Uploaded Successfully',
    );
  };
}
