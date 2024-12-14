import { Entity } from 'typeorm';

@Entity({ name: 'pricing' })
export class Pricing {
  id: number;

  title: string;

  createdAt: Date;
  updatedAt: Date;
  DeletedAt: Date;
}
