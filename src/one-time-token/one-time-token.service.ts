import { Injectable, NotFoundException } from '@nestjs/common';
import { OneTimeToken, TokenStatus } from './entities/one-time-token.entity';
import { ResponsesHelper } from 'src/helpers/responses';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VerifyOneTimeToken } from './dto/verify-one-time-token.dto';
import { UserService } from 'src/user/user.service';
import { User, UserStatus } from 'src/user/entities/user.entity';
import { UtilsHelper } from 'src/helpers/utils';

@Injectable()
export class OneTimeTokenService {
  constructor(
    @InjectRepository(OneTimeToken)
    private readonly oneTimeTokenRepository: Repository<OneTimeToken>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly responseHelper: ResponsesHelper,
    private readonly userService: UserService,
    private readonly utilHelper: UtilsHelper,
  ) {}

  async createNewToken(userId: number) {
    const userInfo = (await this.userService.getUser(userId)).data;

    const tokens = await this.oneTimeTokenRepository.find({
      where: { user: userInfo, tokenStatus: TokenStatus.ALIVE },
    });

    tokens.forEach((token) => this.killToken(token));

    const newToken = this.oneTimeTokenRepository.create({
      generatedOTP: await this.generateToken(),
      generateReason: 'Verification',
      user: userInfo,
    });

    await this.oneTimeTokenRepository.save(newToken);

    return this.responseHelper.buildServiceResponse(
      {},
      'One Time Token Generated Successfully',
    );
  }

  async requestNewToken(userId: number) {
    const userInfo = (await this.userService.getUser(userId)).data;

    const token = await this.oneTimeTokenRepository.findOne({
      where: { user: userInfo, tokenStatus: TokenStatus.ALIVE },
    });

    if (token) this.killToken(token);

    const newToken = this.oneTimeTokenRepository.create({
      generatedOTP: await this.generateToken(),
      generateReason: 'Verification',
      user: userInfo,
    });

    await this.oneTimeTokenRepository.save(newToken);

    return this.responseHelper.buildServiceResponse(
      {},
      'One Time Token Generated Successfully',
    );
  }

  async verifyToken(tokenData: VerifyOneTimeToken, userId: number) {
    const userInfo = (await this.userService.getUser(userId)).data;

    const token = await this.oneTimeTokenRepository.findOne({
      where: { user: userInfo, generatedOTP: tokenData.token },
    });

    if (token && process.env.APP_ENV != 'dev')
      throw new NotFoundException(
        this.responseHelper.buildServiceResponse(
          {},
          'Invalid Or Expired One Time Token.',
          false
        ),
      );

    userInfo.status = UserStatus.VERIFIED;
    this.userRepository.save(userInfo, { reload: true });

    if (process.env.APP_ENV != 'dev') this.killToken(token);

    return this.responseHelper.buildServiceResponse(
      {},
      'User Verified Successfully',
    );
  }

  async generateToken() {
    return this.utilHelper.generateRandInt(6);
  }

  async killToken(token: OneTimeToken) {
    token.generateReason = null;
    token.tokenStatus = TokenStatus.DEAD;

    this.oneTimeTokenRepository.save(token);
  }
}
