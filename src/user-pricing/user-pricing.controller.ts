import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserPricingService } from './user-pricing.service';
import { CreateUserPricingDto } from './dto/create-user-pricing.dto';
import { UpdateUserPricingDto } from './dto/update-user-pricing.dto';

@Controller('user-pricing')
export class UserPricingController {
  constructor(private readonly userPricingService: UserPricingService) {}

  @Post()
  create(@Body() createUserPricingDto: CreateUserPricingDto) {
    return this.userPricingService.create(createUserPricingDto);
  }

  @Get()
  findAll() {
    return this.userPricingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userPricingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserPricingDto: UpdateUserPricingDto) {
    return this.userPricingService.update(+id, updateUserPricingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userPricingService.remove(+id);
  }
}
