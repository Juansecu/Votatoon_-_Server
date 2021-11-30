import { Controller, Get, Param } from '@nestjs/common';

import { IErrorResponseMessage } from '../shared/typings/ErrorResponseMessage';
import { ISuccessResponseMessage } from '../shared/typings/SuccessResponseMessage';

import { EContestantType } from '../contestants/enums/Contestant';

import { VotesService } from './services/votes.service';

@Controller('votes')
export class VotesController {
  constructor(private readonly _VOTES_SERVICE: VotesService) {}

  @Get('vote/:contestant')
  async vote(
    @Param('contestant') contestantType: EContestantType
  ): Promise<ISuccessResponseMessage | IErrorResponseMessage> {
    return this._VOTES_SERVICE.vote(contestantType);
  }
}
