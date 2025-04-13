import { PreferenceChoice } from 'src/preference-choice/entities/preference-choice.entity';
import { UserPreference } from 'src/user-preference/entities/user-preference.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'preferences' })
export class Preference {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext' })
  title: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(
    () => PreferenceChoice,
    (preferenceChoice) => preferenceChoice.preference,
  )
  preference_choices: PreferenceChoice[];

  @OneToMany(
    () => UserPreference,
    (userPreference) => userPreference.preference,
  )
  user_preferences: UserPreference[];
}
