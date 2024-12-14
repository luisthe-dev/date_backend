import { User } from 'src/user/entities/user.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'meet_up_requests' })
export class MeetUpRequest {
  id: number;

  guestId: User;
  escordId: User;
  meetUpStatus: string;

  createdAt: Date;
  updatedAt: Date;
  DeletedAt: Date;
}
