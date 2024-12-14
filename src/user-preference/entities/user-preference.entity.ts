import { PreferenceChoice } from 'src/preference-choice/entities/preference-choice.entity';
import { Preference } from 'src/preference/entities/preference.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'user_prefence_choices' })
export class UserPreference {
  id: number;

  user: User;
  preference: Preference;
  preferenceChoice: PreferenceChoice;

  createdAt: Date;
  updatedAt: Date;
  DeletedAt: Date;
}
