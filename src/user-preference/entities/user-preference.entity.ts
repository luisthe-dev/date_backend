import { PreferenceChoice } from 'src/preference-choice/entities/preference-choice.entity';
import { Preference } from 'src/preference/entities/preference.entity';
import { User } from 'src/user/entities/user.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user_preference_choices' })
export class UserPreference {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.user_preferences)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Preference, (preference) => preference.user_preferences)
  @JoinColumn()
  preference: Preference;

  @ManyToOne(
    () => PreferenceChoice,
    (preferenceChoice) => preferenceChoice.user_preferences,
  )
  @JoinColumn()
  preferenceChoice: PreferenceChoice;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
