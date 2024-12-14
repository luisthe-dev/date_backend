import { Entity } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  id: number;

  fullName: string;
  displayName: string;
  gender: string;
  email: string;
  password: string;
  mindThoughts: string;
  dateOfBirth: Date;
  accountStatus: 'Pending' | 'Verified' | 'Blocked';

  createdAt: Date;
  updatedAt: Date;
  DeletedAt: Date;
}
