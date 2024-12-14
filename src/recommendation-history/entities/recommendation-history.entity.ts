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

export enum RecommendResponse {
  ACCEPT = 'accept',
  REJECT = 'reject',
}

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
  @Column({
    type: 'enum',
    enum: RecommendResponse,
    default: RecommendResponse.ACCEPT,
  })
  recommendResponse: RecommendResponse;

  @OneToOne(() => MeetUpRequest, { nullable: true })
  @JoinColumn()
  meetUpId: MeetUpRequest;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
