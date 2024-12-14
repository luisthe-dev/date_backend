import { Entity } from 'typeorm';

@Entity({ name: 'configs' })
export class Config {
  id: number;

  name: string;
  value: string;

  createdAt: Date;
  updatedAt: Date;
  DeletedAt: Date;
}
