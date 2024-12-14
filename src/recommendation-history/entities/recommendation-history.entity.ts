import { MeetUpRequest } from 'src/meet-up-request/entities/meet-up-request.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'recommendation_history' })
export class RecommendationHistory {
  id: number;

  recommendTo: User;
  recommend: User;
  recommendResponse: 'Accept' | 'Reject';
  meetUpId: MeetUpRequest;

  createdAt: Date;
  updatedAt: Date;
  DeletedAt: Date;
}
