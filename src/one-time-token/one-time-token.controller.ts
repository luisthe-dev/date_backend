import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OneTimeTokenService } from './one-time-token.service';

@Controller('one-time-token')
export class OneTimeTokenController {
  constructor(private readonly oneTimeTokenService: OneTimeTokenService) {}
}
