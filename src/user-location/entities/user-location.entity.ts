import { User } from 'src/user/entities/user.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'user_locations' })
export class UserLocation {
  id: number;

  user: User;
  coordinates: string;
  address: string;

  createdAt: Date;
  updatedAt: Date;
  DeletedAt: Date;
}
