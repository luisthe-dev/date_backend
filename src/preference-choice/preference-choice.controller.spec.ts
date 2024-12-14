import { Test, TestingModule } from '@nestjs/testing';
import { PreferenceChoiceController } from './preference-choice.controller';
import { PreferenceChoiceService } from './preference-choice.service';

describe('PreferenceChoiceController', () => {
  let controller: PreferenceChoiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreferenceChoiceController],
      providers: [PreferenceChoiceService],
    }).compile();

    controller = module.get<PreferenceChoiceController>(PreferenceChoiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
