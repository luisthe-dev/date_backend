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

@Entity({ name: 'user_medias' })
export class UserMedia {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @ManyToOne(() => User, user => user.userMedias)
  @JoinColumn()
  user: User;

  @Column({ type: 'longtext' })
  mediaUrl: string;

  @Column({ type: 'varchar' })
  mediaType: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
