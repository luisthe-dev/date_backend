import { PartialType } from '@nestjs/mapped-types';
import { CreateUserPricingDto } from './create-user-pricing.dto';

export class UpdateUserPricingDto extends PartialType(CreateUserPricingDto) {}
