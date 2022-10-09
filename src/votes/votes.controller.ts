import { Controller, Get, Param } from '@nestjs/common';

import { ISuccessResponseMessage } from '../shared/typings/SuccessResponseMessage';

import { EContestantType } from '../contestants/enums/Contestant';

import { VotesService } from './services/votes.service';

@Controller('votes')
export class VotesController {
  constructor(private readonly _VOTES_SERVICE: VotesService) {}

  @Get('vote/:contestant')
  async vote(
    @Param('contestant') contestantType: EContestantType
  ): Promise<ISuccessResponseMessage> {
    return this._VOTES_SERVICE.vote(contestantType);
  }
}
