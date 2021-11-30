import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IErrorResponseMessage } from '../../shared/typings/ErrorResponseMessage';
import { ISuccessResponseMessage } from '../../shared/typings/SuccessResponseMessage';

import { RaceDto } from '../../races/dtos/Race.dto';

import { EContestantType } from '../../contestants/enums/Contestant';

import { VoteTotalEntity } from '../entities/vote-total.entity';

import { RacesService } from '../../races/services/races.service';

@Injectable()
export class VotesService {
  constructor(
    private readonly _RACES_SERVICE: RacesService,
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

      throw new NotFoundException({
        error: 'NoVotesTotal',
        message: 'No vote-total objects were found'
      });
    } catch (error) {
      throw new InternalServerErrorException({
        error: error.name,
        message: error.message
      });
    }
  }

  async vote(
    contestantType: EContestantType
  ): Promise<ISuccessResponseMessage | IErrorResponseMessage> {
    if (contestantType != 'a' && contestantType != 'b')
      throw new BadRequestException({
        error: 'ContestantType Error',
        message: 'Unknown ContestantType'
      });

    const currentRace = await this._RACES_SERVICE.getCurrentRace();

    if (currentRace instanceof RaceDto) {
      try {
        const vote: VoteTotalEntity =
          await this._VOTES_TOTAL_REPOSITORY.findOne({
            where: {
              contestantType,
              raceId: currentRace.id
            }
          });

        if (vote) {
          vote.voteTotalValue++;
          await this._VOTES_TOTAL_REPOSITORY.save(vote);

          return {
            success: true,
            message: 'Vote saved'
          };
        }

        throw new NotFoundException({
          error: 'VoteTotalNotFound',
          message: 'No vote-total object was found'
        });
      } catch (error) {
        throw new InternalServerErrorException({
          error: error.name,
          message: error.message
        });
      }
    }

    throw new NotFoundException({
      error: 'NoActiveRace',
      message: 'No active-race was found'
    });
  }
}
