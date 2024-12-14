import { MeetUpRequest } from 'src/meet-up-request/entities/meet-up-request.entity';
import { User } from 'src/user/entities/user.entity';
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

@Entity({ name: 'recommendation_history' })
export class RecommendationHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  recommendTo: User;

  @OneToOne(() => User)
  @JoinColumn()
  recommend: User;

  @Column({ type: 'varchar' })
  recommendResponse: 'Accept' | 'Reject';

  @OneToOne(() => MeetUpRequest)
  @JoinColumn()
  meetUpId: MeetUpRequest;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
