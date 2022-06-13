import { Test, TestingModule } from '@nestjs/testing';

import { ContestantsService } from './contestants.service';

describe('ContestantsService', () => {
  let contestantsService: ContestantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContestantsService]
    }).compile();

    contestantsService = module.get<ContestantsService>(ContestantsService);
  });

  it('contestantsService should be defined', () => {
    expect(contestantsService).toBeDefined();
  });
});
