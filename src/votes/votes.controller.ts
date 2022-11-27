import { Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags
} from '@nestjs/swagger';

import { IRequestClientData } from '../clients/typings/Request';

import { EContestantType } from '../contestants/enums/contestant-type.enum';

import { ErrorResMessage } from '../shared/dtos/response/error.res.dto';
import { SuccessResMessage } from '../shared/dtos/response/success.res.dto';

import { VotesService } from './services/votes.service';

@ApiTags('Votes')
@Controller('votes')
export class VotesController {
  constructor(private readonly _VOTES_SERVICE: VotesService) {}

  @ApiConflictResponse({
    description: 'The vote has already been cast',
    type: ErrorResMessage
  })
  @ApiCreatedResponse({
    description: 'The vote has been cast',
    type: SuccessResMessage
  })
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while adding the vote',
    type: ErrorResMessage
  })
  @HttpCode(201)
  @Get('vote/a|b')
  async getVote(
    @Req() request: IRequestClientData
  ): Promise<SuccessResMessage> {
    return await this._VOTES_SERVICE.vote(
      request.url.charAt(request.url.length - 1) as EContestantType,
      request
    );
  }

  @ApiConflictResponse({
    description: 'The vote has already been cast',
    type: ErrorResMessage
  })
  @ApiCreatedResponse({
    description: 'The vote has been cast',
    type: SuccessResMessage
  })
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while adding the vote',
    type: ErrorResMessage
  })
  @Post('vote/a|b')
  async postVote(
    @Req() request: IRequestClientData
  ): Promise<SuccessResMessage> {
    return await this._VOTES_SERVICE.vote(
      request.url.charAt(request.url.length - 1) as EContestantType,
      request
    );
  }
}
