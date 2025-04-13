import { Preference } from 'src/preference/entities/preference.entity';
import { UserPreference } from 'src/user-preference/entities/user-preference.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'preference_choices' })
export class PreferenceChoice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Preference, (preference) => preference.preference_choices)
  preference: Preference;

  @OneToMany(
    () => UserPreference,
    (userPreference) => userPreference.preferenceChoice,
  )
  user_preferences: UserPreference[];

  @Column({ type: 'longtext' })
  value: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
