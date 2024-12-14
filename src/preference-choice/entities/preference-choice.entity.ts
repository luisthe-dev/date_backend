import { Preference } from 'src/preference/entities/preference.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'preference_choices' })
export class PreferenceChoice {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Preference)
  @JoinColumn()
  preference: Preference;

  @Column({ type: 'varchar' })
  value: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
