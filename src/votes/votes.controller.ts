import { Controller, Get, HttpCode, Post, Req } from '@nestjs/common';

import { IRequestClientData } from '../clients/typings/Request';
import { ISuccessResponseMessage } from '../shared/typings/SuccessResponseMessage';

import { EContestantType } from '../contestants/enums/contestant-type.enum';

import { VotesService } from './services/votes.service';

@Controller('votes')
export class VotesController {
  constructor(private readonly _VOTES_SERVICE: VotesService) {}

  @HttpCode(201)
  @Get('vote/a|b')
  async getVote(
    @Req() request: IRequestClientData
  ): Promise<ISuccessResponseMessage> {
    return await this._VOTES_SERVICE.vote(
      request.url.charAt(request.url.length - 1) as EContestantType,
      request
    );
  }

  @Post('vote/a|b')
  async postVote(
    @Req() request: IRequestClientData
  ): Promise<ISuccessResponseMessage> {
    return await this._VOTES_SERVICE.vote(
      request.url.charAt(request.url.length - 1) as EContestantType,
      request
    );
  }
}
