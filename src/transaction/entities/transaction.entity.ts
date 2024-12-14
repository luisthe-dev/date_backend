import { Wallet } from 'src/wallet/entities/wallet.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Wallet)
  @JoinColumn()
  wallet: Wallet;

  @Column({ type: 'varchar' })
  amount: number;

  @Column({ type: 'varchar' })
  transactionId: string;

  @Column({ type: 'varchar' })
  thirdPartyData: string;

  @Column({ type: 'varchar' })
  transactionStatus: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
