import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'request_logs' })
export class RequestLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  requestUrl: string;

  @Column({ type: 'varchar' })
  request: string;

  @Column({ type: 'varchar', nullable: true })
  response: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
