import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  signUp() {}

  @Post('/signin')
  signIn() {}

  @Get()
  getUser() {}

  @Patch()
  userUpdate() {}

  @Get('/activity')
  getUserActivity() {}

  @Post('/password/forgot')
  requestPasswordReset() {}

  @Post('/password/update')
  updatePassword() {}

  @Get('medias')
  getUserMedia() {}

  @Post('/medias')
  uploadUserMedia() {}

  @Get('/locations')
  getUserLocation() {}

  @Post('/locations')
  updateUserLocation() {}

  @Get('preferences')
  getUserPreference() {}

  @Post('preferences')
  updateUserPreference() {}

  @Get('/wallets')
  getUserWallet() {}

  @Post('/wallets')
  fundUserWallet() {}

  @Get('/recommendations')
  getUserRecommendations() {}

  @Post('/recommendations')
  updateUserRecommendations() {}

  @Patch('/tokens')
  validateUserToken() {}

  @Post('/tokens')
  requestNewToken() {}
}
