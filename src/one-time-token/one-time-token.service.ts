import { Injectable } from '@nestjs/common';
import { CreateOneTimeTokenDto } from './dto/create-one-time-token.dto';
import { UpdateOneTimeTokenDto } from './dto/update-one-time-token.dto';

@Injectable()
export class OneTimeTokenService {
  create(createOneTimeTokenDto: CreateOneTimeTokenDto) {
    return 'This action adds a new oneTimeToken';
  }

  findAll() {
    return `This action returns all oneTimeToken`;
  }

  findOne(id: number) {
    return `This action returns a #${id} oneTimeToken`;
  }

  update(id: number, updateOneTimeTokenDto: UpdateOneTimeTokenDto) {
    return `This action updates a #${id} oneTimeToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} oneTimeToken`;
  }
}
