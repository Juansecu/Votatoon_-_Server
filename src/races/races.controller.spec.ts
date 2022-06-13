import { Test, TestingModule } from '@nestjs/testing';

import { RacesController } from './races.controller';

describe('RacesController', () => {
  let racesController: RacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RacesController]
    }).compile();

    racesController = module.get<RacesController>(RacesController);
  });

  it('racesController should be defined', () => {
    expect(racesController).toBeDefined();
  });
});
