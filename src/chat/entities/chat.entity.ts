import { Entity } from 'typeorm';

@Entity({ name: 'chats' })
export class Chat {
  id: number;

  chatTitle: string;
  chatMembers: string;

  createdAt: Date;
  updatedAt: Date;
  DeletedAt: Date;
}
