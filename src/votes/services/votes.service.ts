import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IErrorResponseMessage } from '../../shared/typings/ErrorResponseMessage';

import { VoteTotalEntity } from '../entities/vote-total.entity';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(VoteTotalEntity)
    private readonly _VOTES_TOTAL_REPOSITORY: Repository<VoteTotalEntity>
  ) {}

  async getVotesTotalByRaceId(
    raceId: number
  ): Promise<VoteTotalEntity[] | IErrorResponseMessage> {
    try {
      const votesTotal: VoteTotalEntity[] =
        await this._VOTES_TOTAL_REPOSITORY.find({
          take: 2,
          where: {
            raceId
          }
        });

      if (votesTotal instanceof Array) return votesTotal;

      return {
        error: 'NoVotesTotal',
        message: 'No vote-total objects were found'
      };
    } catch (error) {
      return {
        error: error.name,
        message: error.message
      };
    }
  }
}
