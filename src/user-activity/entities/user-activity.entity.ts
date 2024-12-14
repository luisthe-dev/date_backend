import { User } from 'src/user/entities/user.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'user_activity_logs' })
export class UserActivity {
  id: number;

  user: User;
  log: string;

  createdAt: Date;
  updatedAt: Date;
  DeletedAt: Date;
}
