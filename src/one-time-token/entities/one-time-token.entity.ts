import { User } from 'src/user/entities/user.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'one_time_tokens' })
export class OneTimeToken {
  id: number;

  user: User;

  generateReason: string;
  generatedOTP: number;

  tokenStatus: 'Dead' | 'Alive';

  createdAt: Date;
  updatedAt: Date;
  DeletedAt: Date;
}
