import { Test, TestingModule } from '@nestjs/testing';

import { RacesService } from './races.service';

describe('RacesService', () => {
  let racesService: RacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RacesService]
    }).compile();

    racesService = module.get<RacesService>(RacesService);
  });

  it('racesService should be defined', () => {
    expect(racesService).toBeDefined();
  });
});
