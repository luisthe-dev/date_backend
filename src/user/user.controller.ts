import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponsesHelper } from 'src/helpers/responses';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserPasswordDto } from './dto/update-password.dto';
import { OneTimeTokenService } from 'src/one-time-token/one-time-token.service';
import { VerifyOneTimeToken } from 'src/one-time-token/dto/verify-one-time-token.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly otpService: OneTimeTokenService,
    private readonly responseHelper: ResponsesHelper,
  ) {}

  @Post('/signup')
  async signUp(@Body() createUser: CreateUserDto) {
    return 'this';
    const response = await this.userService.createUser(createUser);

    return this.responseHelper.buildControllerResponse(response);
  }

  @Post('/signin')
  async signIn(@Body() loginUser: LoginUserDto) {
    const response = await this.userService.loginUser(loginUser);

    return this.responseHelper.buildControllerResponse(response);
  }

  @Get()
  async getUser() {
    const userId = 1;
    const response = await this.userService.getUser(userId);

    return this.responseHelper.buildControllerResponse(response);
  }

  @Patch()
  async userUpdate() {}

  @Get('/activity')
  async getUserActivity() {}

  @Post('/password/forgot')
  async requestPasswordReset() {}

  @Post('/password/update')
  async updatePassword(@Body() updatePassword: UpdateUserPasswordDto) {
    const userId = 1;
    const response = await this.userService.updateUserPassword(
      userId,
      updatePassword,
    );

    return this.responseHelper.buildControllerResponse(response);
  }

  @Get('medias')
  async getUserMedia() {}

  @Post('/medias')
  async uploadUserMedia() {}

  @Get('/locations')
  async getUserLocation() {}

  @Post('/locations')
  async updateUserLocation() {}

  @Get('preferences')
  async getUserPreference() {}

  @Post('preferences')
  async updateUserPreference() {}

  @Get('/wallets')
  async getUserWallet() {}

  @Post('/wallets')
  async fundUserWallet() {}

  @Get('/recommendations')
  async getUserRecommendations() {}

  @Post('/recommendations')
  async updateUserRecommendations() {}

  @Post('/tokens')
  async validateUserToken(@Body() tokenData: VerifyOneTimeToken) {
    const userId = 1;
    const response = await this.otpService.verifyToken(tokenData, userId);

    return this.responseHelper.buildControllerResponse(response);
  }

  @Patch('/tokens')
  async requestNewToken() {
    const userId = 1;
    const response = await this.otpService.requestNewToken(userId);

    return this.responseHelper.buildControllerResponse(response);
  }
}
