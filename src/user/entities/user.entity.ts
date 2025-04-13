import { Exclude } from 'class-transformer';
import { UserMedia } from 'src/user-media/entities/user-media.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  BLOCKED = 'blocked',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  fullName: string;

  @Index()
  @Column({ type: 'varchar', unique: true, nullable: true })
  displayName: string;

  @Column({ type: 'varchar' })
  gender: string;

  @Index()
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Index()
  @Column({ type: 'varchar', unique: true, nullable: true })
  phone: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'longtext', nullable: true })
  mindThoughts: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Index()
  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.PENDING,
  })
  accountStatus: UserStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => UserMedia, (userMedia) => userMedia.user)
  userMedias: UserMedia[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
