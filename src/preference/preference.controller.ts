import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PreferenceService } from './preference.service';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { ResponsesHelper } from 'src/helpers/responses';
import { PaginationRequestDto } from 'src/helpers/dtos/pagination-request.dto';

@Controller('preference')
export class PreferenceController {
  constructor(
    private readonly preferenceService: PreferenceService,
    private readonly responseHelper: ResponsesHelper,
  ) {}

  @Post()
  async create(@Body() createPreferenceDto: CreatePreferenceDto) {
    const response = await this.preferenceService.create(createPreferenceDto);

    return this.responseHelper.buildControllerResponse(response);
  }

  @Get()
  async findAll(@Query() paginationData: PaginationRequestDto) {
    const response = await this.preferenceService.findAll(
      paginationData,
    );

    return this.responseHelper.buildPaginatedControllerResponse(
      response,
      paginationData,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preferenceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePreferenceDto: UpdatePreferenceDto,
  ) {
    return this.preferenceService.update(+id, updatePreferenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preferenceService.remove(+id);
  }
}
