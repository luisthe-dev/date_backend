import { Wallet } from 'src/wallet/entities/wallet.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'transactions' })
export class Transaction {
  id: number;

  wallet: Wallet;
  amount: number;
  transactionId: string;
  thirdPartyData: string;
  transactionStatus: string;

  createdAt: Date;
  updatedAt: Date;
  DeletedAt: Date;
}
