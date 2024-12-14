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
import { ResponsesHelper } from 'src/helpers/responses';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserPasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly responseHelper: ResponsesHelper,
  ) {}

  async createUser(userInfo: CreateUserDto) {
    const emailExists = await this.userRepository.findOne({
      where: { email: userInfo.email },
    });

    if (emailExists)
      throw new BadRequestException(
        this.responseHelper.serviceFailResponse('Email Already Exists'),
      );

    if (userInfo.phone) {
      const phoneExists = this.userRepository.findOne({
        where: { phone: userInfo.phone },
      });

      if (phoneExists)
        throw new BadRequestException(
          this.responseHelper.serviceFailResponse('Phone Already Exists'),
        );
    }

    const hashedPassword = await bcrypt.hash(userInfo.password, 20);

    const newUser = this.userRepository.create({
      fullName: userInfo.fullName,
      email: userInfo.email,
      phone: userInfo.phone,
      gender: userInfo.gender,
      password: hashedPassword,
      dateOfBirth: userInfo.dateOfBirth,
    });

    return this.responseHelper.serviceSuccessResponse(
      this.userRepository.save(newUser, { reload: true }),
      'User Created Successfully',
    );
  }

  async loginUser(userInfo: LoginUserDto) {
    const emailExists = await this.userRepository.findOne({
      where: { email: userInfo.userLogin },
    });

    if (!emailExists)
      throw new NotFoundException(
        this.responseHelper.serviceFailResponse('Email Does Not Exist'),
      );

    const passwordValid = await bcrypt.compare(
      userInfo.password,
      emailExists.password,
    );

    if (!passwordValid)
      throw new BadRequestException(
        this.responseHelper.serviceFailResponse('Invalid Login Information'),
      );

    return this.responseHelper.serviceSuccessResponse(
      emailExists,
      'User Logged In Successfully',
    );
  }

  async getUser(userId: number) {
    const idExists = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (idExists)
      throw new UnauthorizedException(
        this.responseHelper.serviceFailResponse('User Does Not Exist'),
      );

    return this.responseHelper.serviceSuccessResponse(
      idExists,
      'User Fetched Successfully',
    );
  }

  async updateUserPassword(userId, passwordInfo: UpdateUserPasswordDto) {
    const idExists = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (idExists)
      throw new UnauthorizedException(
        this.responseHelper.serviceFailResponse('User Does Not Exist'),
      );

    const passwordValid = bcrypt.compare(
      passwordInfo.currentPassword,
      idExists.password,
    );

    if (!passwordValid)
      throw new BadRequestException(
        this.responseHelper.serviceFailResponse('Invalid User Information'),
      );

    idExists.password = passwordInfo.newPassword;

    return this.responseHelper.serviceSuccessResponse(
      this.userRepository.save(idExists, { reload: true }),
      'User Password Updated Successfully',
    );
  }
}
