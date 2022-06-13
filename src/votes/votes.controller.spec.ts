import { Test, TestingModule } from '@nestjs/testing';

import { VotesController } from './votes.controller';

describe('VotesController', () => {
  let votesController: VotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VotesController]
    }).compile();

    votesController = module.get<VotesController>(VotesController);
  });

  it('votesController should be defined', () => {
    expect(votesController).toBeDefined();
  });
});
