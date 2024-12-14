import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserLocationService } from './user-location.service';
import { CreateUserLocationDto } from './dto/create-user-location.dto';
import { UpdateUserLocationDto } from './dto/update-user-location.dto';

@Controller('user-location')
export class UserLocationController {
  constructor(private readonly userLocationService: UserLocationService) {}

  @Post()
  create(@Body() createUserLocationDto: CreateUserLocationDto) {
    return this.userLocationService.create(createUserLocationDto);
  }

  @Get()
  findAll() {
    return this.userLocationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userLocationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserLocationDto: UpdateUserLocationDto) {
    return this.userLocationService.update(+id, updateUserLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userLocationService.remove(+id);
  }
}
