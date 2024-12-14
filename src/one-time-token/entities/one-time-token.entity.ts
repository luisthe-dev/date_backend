import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TokenStatus {
  DEAD = 'dead',
  ALIVE = 'alive',
}

@Entity({ name: 'one_time_tokens' })
export class OneTimeToken {
  @PrimaryGeneratedColumn()
  id: number;

  user: User;

  @Column({ type: 'varchar', nullable: true })
  generateReason: string;

  @Column({ type: 'int' })
  generatedOTP: number;

  @Column({
    type: 'enum',
    enum: TokenStatus,
    default: TokenStatus.ALIVE,
  })
  tokenStatus: TokenStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
