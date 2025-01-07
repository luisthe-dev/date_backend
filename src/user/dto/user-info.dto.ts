import { User, UserStatus } from '../entities/user.entity';

export class UserInfoDto {
  id: number;

  fullName: string;

  displayName: string;

  gender: string;

  email: string;

  phone: string;

  mindThoughts: string;

  dateOfBirth: Date;

  accountStatus: UserStatus;

  created_at: Date;

  updated_at: Date;
}

export const buildUserInfoResponse = (userData: User): UserInfoDto => {
  return {
    id: userData.id,
    fullName: userData.fullName,
    displayName: userData.displayName,
    gender: userData.gender,
    email: userData.email,
    phone: userData.phone,
    mindThoughts: userData.mindThoughts,
    dateOfBirth: userData.dateOfBirth,
    accountStatus: userData.accountStatus,
    created_at: userData.created_at,
    updated_at: userData.updated_at,
  };
};
