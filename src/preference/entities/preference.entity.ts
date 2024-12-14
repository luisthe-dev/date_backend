import { Entity } from 'typeorm';

@Entity({ name: 'preferences' })
export class Preference {
  id: number;

  title: string;

  createdAt: Date;
  updatedAt: Date;
  DeletedAt: Date;
}
