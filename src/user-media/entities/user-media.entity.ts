import { User } from 'src/user/entities/user.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'user_medias' })
export class UserMedia {
  id: number;

  user: User;
  mediaUrl: string;
  mediaType: string;

  createdAt: Date;
  updatedAt: Date;
  DeletedAt: Date;
}
