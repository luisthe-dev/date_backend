import { PreferenceChoice } from 'src/preference-choice/entities/preference-choice.entity';
import { Preference } from 'src/preference/entities/preference.entity';
import { User } from 'src/user/entities/user.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user_prefence_choices' })
export class UserPreference {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Preference)
  @JoinColumn()
  preference: Preference;

  @OneToOne(() => PreferenceChoice)
  @JoinColumn()
  preferenceChoice: PreferenceChoice;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
