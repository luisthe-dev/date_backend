import { User } from 'src/user/entities/user.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'wallets' })
export class Wallet {
  id: number;

  user: User;
  walletLabel: string;
  walletBalance: number;

  createdAt: Date;
  updatedAt: Date;
  DeletedAt: Date;
}
