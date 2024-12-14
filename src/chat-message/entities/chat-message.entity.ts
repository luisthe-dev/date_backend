import { Chat } from 'src/chat/entities/chat.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'chat_messages' })
export class ChatMessage {
  id: number;

  chat: Chat;
  user: User;
  message: string;

  createdAt: Date;
  updatedAt: Date;
  DeletedAt: Date;
}
