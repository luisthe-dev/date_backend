import { Injectable } from '@nestjs/common';
import { CreateUserPricingDto } from './dto/create-user-pricing.dto';
import { UpdateUserPricingDto } from './dto/update-user-pricing.dto';

@Injectable()
export class UserPricingService {
  create(createUserPricingDto: CreateUserPricingDto) {
    return 'This action adds a new userPricing';
  }

  findAll() {
    return `This action returns all userPricing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userPricing`;
  }

  update(id: number, updateUserPricingDto: UpdateUserPricingDto) {
    return `This action updates a #${id} userPricing`;
  }

  remove(id: number) {
    return `This action removes a #${id} userPricing`;
  }
}
