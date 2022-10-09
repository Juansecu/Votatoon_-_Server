import { Controller, Get } from '@nestjs/common';

import { RaceDto } from './dtos/Race.dto';

import { RacesService } from './services/races.service';

@Controller('races')
export class RacesController {
  constructor(private readonly _RACES_SERVICE: RacesService) {}

  @Get('current')
  async getCurrentRace(): Promise<RaceDto> {
    return await this._RACES_SERVICE.getCurrentRace();
  }

  @Get('all')
  async getRaceList(): Promise<RaceDto[]> {
    return await this._RACES_SERVICE.getRaceList();
  }
}
