import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  UseGuards,
  Req,
  Put,
  UseInterceptors,
  UploadedFiles,
  FileTypeValidator,
  ParseFilePipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponsesHelper } from 'src/helpers/responses';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserPasswordDto } from './dto/update-password.dto';
import { OneTimeTokenService } from 'src/one-time-token/one-time-token.service';
import { VerifyOneTimeToken } from 'src/one-time-token/dto/verify-one-time-token.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserActivityService } from 'src/user-activity/user-activity.service';
import { PaginationRequestDto } from 'src/helpers/dtos/pagination-request.dto';
import { UserGuard } from '../helpers/guards/user.guard';
import { User } from './entities/user.entity';
import { VerifyGuard } from 'src/helpers/guards/verify.guard';
import { UserMediaService } from 'src/user-media/user-media.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/helpers/configs/multer.config';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly otpService: OneTimeTokenService,
    private readonly responseHelper: ResponsesHelper,
    private readonly userActivityService: UserActivityService,
    private readonly userMediaService: UserMediaService,
  ) {}

  @Post('/signup')
  async signUp(@Body() createUser: CreateUserDto) {
    const response = await this.userService.createUser(createUser);

    return this.responseHelper.buildControllerResponse(response);
  }

  @Post('/signin')
  async signIn(@Body() loginUser: LoginUserDto) {
    const response = await this.userService.loginUser(loginUser);

    return this.responseHelper.buildControllerResponse(response);
  }

  @UseGuards(UserGuard)
  @Get()
  async getUser(@Req() request: any) {
    const { user }: { user: User } = request;
    const response = await this.userService.getUser(user.id);

    return this.responseHelper.buildControllerResponse(response);
  }

  @UseGuards(UserGuard, VerifyGuard)
  @Patch()
  async userUpdate(@Body() updateData: UpdateUserDto, @Req() request: any) {
    const { user }: { user: User } = request;
    const response = await this.userService.updateUser(user, updateData);

    return this.responseHelper.buildControllerResponse(response);
  }

  @UseGuards(UserGuard, VerifyGuard)
  @Get('/activity')
  async getUserActivity(
    @Query() paginationData: PaginationRequestDto,
    @Req() request: any,
  ) {
    const { user }: { user: User } = request;
    const response = await this.userActivityService.getUserActivity(
      user,
      paginationData,
    );

    return this.responseHelper.buildPaginatedControllerResponse(
      response,
      paginationData,
    );
  }

  @Post('/password/forgot')
  async requestPasswordReset() {}

  @UseGuards(UserGuard, VerifyGuard)
  @Post('/password/update')
  async updatePassword(
    @Body() updatePassword: UpdateUserPasswordDto,
    @Req() request: any,
  ) {
    const { user }: { user: User } = request;
    const response = await this.userService.updateUserPassword(
      user,
      updatePassword,
    );

    return this.responseHelper.buildControllerResponse(response);
  }

  @UseGuards(UserGuard, VerifyGuard)
  @Get('medias')
  async getUserMedia(
    @Query() paginationData: PaginationRequestDto,
    @Req() request: any,
  ) {
    const { user }: { user: User } = request;
    const response = await this.userMediaService.getUserMedia(
      user,
      paginationData,
    );

    return this.responseHelper.buildPaginatedControllerResponse(
      response,
      paginationData,
    );
  }

  @UseGuards(UserGuard, VerifyGuard)
  @Post('/medias')
  @UseInterceptors(FilesInterceptor('medias[]', 20, multerOptions))
  async uploadUserMedia(
    @Req() request: any,
    @UploadedFiles() medias: Array<Express.Multer.File>,
  ) {
    const { user }: { user: User } = request;
    const response = await this.userMediaService.uploadUserMedia(user, medias);

    return this.responseHelper.buildControllerResponse(response);
  }

  @UseGuards(UserGuard, VerifyGuard)
  @Get('/locations')
  async getUserLocation() {}

  @UseGuards(UserGuard, VerifyGuard)
  @Post('/locations')
  async updateUserLocation() {}

  @UseGuards(UserGuard, VerifyGuard)
  @Get('preferences')
  async getUserPreference() {}

  @UseGuards(UserGuard, VerifyGuard)
  @Put('preferences')
  async updateUserPreference() {}

  @UseGuards(UserGuard, VerifyGuard)
  @Get('/wallets')
  async getUserWallet() {}

  @UseGuards(UserGuard, VerifyGuard)
  @Post('/wallets')
  async fundUserWallet() {}

  @UseGuards(UserGuard, VerifyGuard)
  @Get('/recommendations')
  async getUserRecommendations() {}

  @UseGuards(UserGuard, VerifyGuard)
  @Post('/recommendations')
  async updateUserRecommendations() {}

  @UseGuards(UserGuard)
  @Post('/tokens')
  async validateUserToken(
    @Body() tokenData: VerifyOneTimeToken,
    @Req() request: any,
  ) {
    const { user } = request;
    const response = await this.otpService.verifyToken(tokenData, user.id);

    return this.responseHelper.buildControllerResponse(response);
  }

  @UseGuards(UserGuard)
  @Patch('/tokens')
  async requestNewToken(@Req() request: any) {
    const { user }: { user: User } = request;
    const response = await this.otpService.requestNewToken(user.id);

    return this.responseHelper.buildControllerResponse(response);
  }
}
