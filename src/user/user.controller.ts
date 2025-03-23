import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
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

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly otpService: OneTimeTokenService,
    private readonly responseHelper: ResponsesHelper,
    private readonly userActivityService: UserActivityService,
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

    const activeUser = (await this.userService.getUser(user.id)).data;
    const response = await this.userService.updateUser(activeUser, updateData);

    return this.responseHelper.buildControllerResponse(response);
  }

  @UseGuards(UserGuard, VerifyGuard)
  @Get('/activity')
  async getUserActivity(
    @Query() paginationData: PaginationRequestDto,
    @Req() request: any,
  ) {
    const { user }: { user: User } = request;
    const activeUser = (await this.userService.getUser(user.id)).data;
    const response = await this.userActivityService.getUserActivity(
      activeUser,
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
    const activeUser = (await this.userService.getUser(user.id)).data;
    const response = await this.userService.updateUserPassword(
      activeUser,
      updatePassword,
    );

    return this.responseHelper.buildControllerResponse(response);
  }

  @UseGuards(UserGuard, VerifyGuard)
  @Get('medias')
  async getUserMedia() {}

  @UseGuards(UserGuard, VerifyGuard)
  @Post('/medias')
  async uploadUserMedia() {}

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
  @Post('preferences')
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
