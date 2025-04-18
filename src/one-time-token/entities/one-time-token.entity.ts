import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
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

  @Index()
  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Index()
  @Column({ type: 'varchar', nullable: true })
  generateReason: string;

  @Index()
  @Column({ type: 'varchar' })
  generatedOTP: string;

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
