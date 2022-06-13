import { Test, TestingModule } from '@nestjs/testing';

import { VotesService } from './votes.service';

describe('VotesService', () => {
  let votesService: VotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VotesService]
    }).compile();

    votesService = module.get<VotesService>(VotesService);
  });

  it('votesService should be defined', () => {
    expect(votesService).toBeDefined();
  });
});
