import { Controller, Get } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';

import { RaceResDto } from './dtos/response/race.res.dto';
import { ErrorResMessage } from '../shared/dtos/response/error.res.dto';

import { RacesService } from './services/races.service';

@ApiTags('Races')
@Controller('races')
export class RacesController {
  constructor(private readonly _RACES_SERVICE: RacesService) {}

  @ApiInternalServerErrorResponse({
    description: 'An error occurred while retrieving the race details',
    type: ErrorResMessage
  })
  @ApiNotFoundResponse({
    description: 'No active race details were found',
    type: ErrorResMessage
  })
  @ApiOkResponse({
    description: 'Returns the details for the current race',
    type: RaceResDto
  })
  @Get('current')
  async getCurrentRace(): Promise<RaceResDto> {
    return await this._RACES_SERVICE.getCurrentRace();
  }

  @ApiInternalServerErrorResponse({
    description: 'An error occurred while retrieving the races details',
    type: ErrorResMessage
  })
  @ApiNotFoundResponse({
    description: 'Any of the races records is invalid',
    type: ErrorResMessage
  })
  @ApiOkResponse({
    description: 'Returns the details for the last two races',
    isArray: true,
    type: RaceResDto
  })
  @Get('all')
  async getRaceList(): Promise<RaceResDto[]> {
    return await this._RACES_SERVICE.getRaceList();
  }
}
