import { Test, TestingModule } from '@nestjs/testing';
import { PreferenceChoiceService } from './preference-choice.service';

describe('PreferenceChoiceService', () => {
  let service: PreferenceChoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PreferenceChoiceService],
    }).compile();

    service = module.get<PreferenceChoiceService>(PreferenceChoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
