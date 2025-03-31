import { Injectable, NotFoundException } from '@nestjs/common';
import { OneTimeToken, TokenStatus } from './entities/one-time-token.entity';
import { ResponsesHelper } from 'src/helpers/responses';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VerifyOneTimeToken } from './dto/verify-one-time-token.dto';
import { User, UserStatus } from 'src/user/entities/user.entity';
import { UtilsHelper } from 'src/helpers/utils';

@Injectable()
export class OneTimeTokenService {
  constructor(
    @InjectRepository(OneTimeToken)
    private readonly oneTimeTokenRepository: Repository<OneTimeToken>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly responseHelper: ResponsesHelper,
    private readonly utilHelper: UtilsHelper,
  ) {}

  async createNewToken(userId: number) {
    const userInfo = await this.userRepository.findOne({
      where: { id: userId },
    });

    const tokens = await this.oneTimeTokenRepository.find({
      where: { user: { id: userInfo.id }, tokenStatus: TokenStatus.ALIVE },
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
    const userInfo = await this.userRepository.findOne({
      where: { id: userId },
    });

    const token = await this.oneTimeTokenRepository.findOne({
      where: { user: { id: userInfo.id }, tokenStatus: TokenStatus.ALIVE },
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
    const userInfo = await this.userRepository.findOne({
      where: { id: userId },
    });

    console.log(tokenData, tokenData.token, userInfo.id);

    const token = await this.oneTimeTokenRepository.findOne({
      where: { user: {id: userInfo.id}, generatedOTP: tokenData.token },
    });

    if (!token && process.env.APP_ENV != 'dev')
      throw new NotFoundException(
        this.responseHelper.buildServiceResponse(
          {},
          'Invalid Or Expired One Time Token.',
          false,
        ),
      );

    userInfo.accountStatus = UserStatus.VERIFIED;
    this.userRepository.save(userInfo, { reload: true });

    if (process.env.APP_ENV != 'dev') this.killToken(token);

    return this.responseHelper.buildServiceResponse(
      {},
      'User Verified Successfully',
    );
  }

  async generateToken() {
    return this.utilHelper.generateRandInt(4).toString();
  }

  async killToken(token: OneTimeToken) {
    token.generateReason = null;
    token.tokenStatus = TokenStatus.DEAD;

    this.oneTimeTokenRepository.save(token);
  }
}
