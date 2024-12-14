import { Preference } from 'src/preference/entities/preference.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'preference_choices' })
export class PreferenceChoice {
  id: number;

  preference: Preference;
  value: string;

  createdAt: Date;
  updatedAt: Date;
  DeletedAt: Date;
}
