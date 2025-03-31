import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ResponsesHelper, ServiceResponseBuild } from 'src/helpers/responses';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserPasswordDto } from './dto/update-password.dto';
import { UserActivityService } from 'src/user-activity/user-activity.service';
import { OneTimeTokenService } from 'src/one-time-token/one-time-token.service';
import { JwtService } from '@nestjs/jwt';
import { buildUserInfoResponse } from './dto/user-info.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userActivityService: UserActivityService,
    private readonly oneTimeTokenService: OneTimeTokenService,
    private readonly responseHelper: ResponsesHelper,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(userInfo: CreateUserDto): Promise<ServiceResponseBuild> {
    const emailExists = await this.userRepository.findOne({
      where: { email: userInfo.email },
    });

    if (emailExists)
      throw new BadRequestException(
        this.responseHelper.buildServiceResponse(
          {},
          'Email Already Exists',
          false,
        ),
      );

    if (userInfo.phone) {
      const phoneExists = await this.userRepository.findOne({
        where: { phone: userInfo.phone },
      });

      if (phoneExists)
        throw new BadRequestException(
          this.responseHelper.buildServiceResponse(
            {},
            'Phone Already Exists',
            false,
          ),
        );
    }

    const hashedPassword = await bcrypt.hash(userInfo.password, 3);

    const newUser = this.userRepository.create({
      fullName: userInfo.fullName,
      email: userInfo.email,
      phone: userInfo.phone,
      gender: userInfo.gender,
      password: hashedPassword,
      dateOfBirth: userInfo.dateOfBirth,
    });

    const user = await this.userRepository.save(newUser, { reload: true });

    this.oneTimeTokenService.createNewToken(user.id);

    this.userActivityService.createUserActivityRecord(user, {
      logEntry: 'User Registered Account Created Successfully',
    });

    delete user.password;

    const userAuthToken = await this.jwtService.signAsync({ ...user });

    return this.responseHelper.buildServiceResponse(
      {
        user: buildUserInfoResponse(user),
        token: { access_token: userAuthToken },
      },
      'User Created Successfully',
    );
  }

  async loginUser(userInfo: LoginUserDto): Promise<ServiceResponseBuild> {
    const user = await this.userRepository.findOne({
      where: { email: userInfo.userLogin },
    });

    if (!user)
      throw new NotFoundException(
        this.responseHelper.buildServiceResponse(
          {},
          'Invalid Login Information',
          false,
        ),
      );

    const passwordValid = await bcrypt.compare(
      userInfo.password,
      user.password,
    );

    if (!passwordValid)
      throw new BadRequestException(
        this.responseHelper.buildServiceResponse(
          {},
          'Invalid Login Information',
          false,
        ),
      );

    this.userActivityService.createUserActivityRecord(user, {
      logEntry: 'User Logged In Successfully',
    });

    delete user.password;

    const userAuthToken = await this.jwtService.signAsync({ ...user });

    return this.responseHelper.buildServiceResponse(
      {
        user: buildUserInfoResponse(user),
        token: { access_token: userAuthToken },
      },
      'User Logged In Successfully',
    );
  }

  async getUser(userId: number): Promise<ServiceResponseBuild> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user)
      throw new UnauthorizedException(
        this.responseHelper.buildServiceResponse(
          {},
          'User Does Not Exist',
          false,
        ),
      );

    return this.responseHelper.buildServiceResponse(
      buildUserInfoResponse(user),
      'User Fetched Successfully',
    );
  }

  async updateUser(
    user: User,
    updateData: UpdateUserDto,
  ): Promise<ServiceResponseBuild> {
    user = { ...user, ...updateData };

    (user = await this.userRepository.save(user, { reload: true })),
      this.userActivityService.createUserActivityRecord(user, {
        logEntry: 'User Information Updated Successfully',
      });

    return this.responseHelper.buildServiceResponse(
      buildUserInfoResponse(user),
      'User Data Updated Successfully',
    );
  }

  async updateUserPassword(
    user: User,
    passwordInfo: UpdateUserPasswordDto,
  ): Promise<ServiceResponseBuild> {
    const passwordValid = bcrypt.compare(
      passwordInfo.currentPassword,
      user.password,
    );

    if (!passwordValid)
      throw new BadRequestException(
        this.responseHelper.buildServiceResponse(
          {},
          'Invalid User Information',
          false,
        ),
      );

    user.password = passwordInfo.newPassword;

    this.userActivityService.createUserActivityRecord(user, {
      logEntry: 'User Updated Password Successfully',
    });

    return this.responseHelper.buildServiceResponse(
      buildUserInfoResponse(
        await this.userRepository.save(user, { reload: true }),
      ),
      'User Password Updated Successfully',
    );
  }
}
