import { Pricing } from 'src/pricing/entities/pricing.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'user_pricing_plans' })
export class UserPricing {
  id: number;

  user: User;
  pricing: Pricing;
  pricingValue: number;

  createdAt: Date;
  updatedAt: Date;
  DeletedAt: Date;
}
