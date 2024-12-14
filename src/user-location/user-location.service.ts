import { Injectable } from '@nestjs/common';
import { CreateUserLocationDto } from './dto/create-user-location.dto';
import { UpdateUserLocationDto } from './dto/update-user-location.dto';

@Injectable()
export class UserLocationService {
  create(createUserLocationDto: CreateUserLocationDto) {
    return 'This action adds a new userLocation';
  }

  findAll() {
    return `This action returns all userLocation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userLocation`;
  }

  update(id: number, updateUserLocationDto: UpdateUserLocationDto) {
    return `This action updates a #${id} userLocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} userLocation`;
  }
}
