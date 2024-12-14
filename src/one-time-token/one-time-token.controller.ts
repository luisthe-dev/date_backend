import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OneTimeTokenService } from './one-time-token.service';
import { CreateOneTimeTokenDto } from './dto/create-one-time-token.dto';
import { UpdateOneTimeTokenDto } from './dto/update-one-time-token.dto';

@Controller('one-time-token')
export class OneTimeTokenController {
  constructor(private readonly oneTimeTokenService: OneTimeTokenService) {}

  @Post()
  create(@Body() createOneTimeTokenDto: CreateOneTimeTokenDto) {
    return this.oneTimeTokenService.create(createOneTimeTokenDto);
  }

  @Get()
  findAll() {
    return this.oneTimeTokenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oneTimeTokenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOneTimeTokenDto: UpdateOneTimeTokenDto) {
    return this.oneTimeTokenService.update(+id, updateOneTimeTokenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oneTimeTokenService.remove(+id);
  }
}
