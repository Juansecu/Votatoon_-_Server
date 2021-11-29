import { Controller, Get } from '@nestjs/common';

import { IRaceResponseMessage } from './typings/RaceResponseMessage';
import { IErrorResponseMessage } from '../shared/typings/ErrorResponseMessage';

import { RacesService } from './services/races.service';

@Controller('CNLA/races')
export class RacesController {
  constructor(private readonly _RACES_SERVICE: RacesService) {}

  @Get('current')
  async getCurrentRace(): Promise<
    IRaceResponseMessage | IErrorResponseMessage
  > {
    return await this._RACES_SERVICE.getCurrentRace();
  }

  @Get('all')
  async getRaceList(): Promise<IRaceResponseMessage[] | IErrorResponseMessage> {
    return await this._RACES_SERVICE.getRaceList();
  }
}
