import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ISuccessResponseMessage } from '../../shared/typings/SuccessResponseMessage';

import { RaceDto } from '../../races/dtos/Race.dto';

import { EContestantType } from '../../contestants/enums/Contestant';

import { VoteTotalEntity } from '../entities/vote-total.entity';

import { ConsoleLoggerService } from '../../loggers/services/console-logger/console-logger.service';
import { RacesService } from '../../races/services/races.service';

@Injectable()
export class VotesService {
  constructor(
    private readonly _CONSOLE_LOGGER_SERVICE: ConsoleLoggerService,
    private readonly _RACES_SERVICE: RacesService,
    @InjectRepository(VoteTotalEntity)
    private readonly _VOTES_TOTAL_REPOSITORY: Repository<VoteTotalEntity>
  ) {}

  async vote(
    contestantType: EContestantType
  ): Promise<ISuccessResponseMessage> {
    this._CONSOLE_LOGGER_SERVICE.debug('Initializing vote service...');

    if (contestantType != 'a' && contestantType != 'b') {
      this._CONSOLE_LOGGER_SERVICE.error(
        'Invalid contestant type provided. Returning error...'
      );

      throw new BadRequestException({
        error: 'ContestantTypeError',
        message: 'Unknown ContestantType'
      });
    }

    const currentRace: RaceDto = await this._RACES_SERVICE.getCurrentRace();

    try {
      this._CONSOLE_LOGGER_SERVICE.verbose(
        `Getting contestant ${contestantType} votes on race ${currentRace.id}...`
      );

      const vote: VoteTotalEntity = await this._VOTES_TOTAL_REPOSITORY.findOne({
        where: {
          contestantType,
          raceId: currentRace.id
        }
      });

      if (vote) {
        vote.voteTotalValue++;

        await this._VOTES_TOTAL_REPOSITORY.save(vote);

        this._CONSOLE_LOGGER_SERVICE.log(
          `Votes count from contestant ${contestantType} on race ${currentRace.id} updated`
        );

        return {
          success: true,
          message: 'Vote saved'
        };
      }

      this._CONSOLE_LOGGER_SERVICE.error(
        'No votes total count found. Returning error...'
      );

      throw new NotFoundException({
        error: 'VoteTotalNotFound',
        message: 'No vote-total object was found'
      });
    } catch (error) {
      this._CONSOLE_LOGGER_SERVICE.error(
        `Error voting for contestant ${contestantType} on ${currentRace.id}: ${error}`
      );

      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException({
        error: error.name,
        message: error.message
      });
    }
  }
}
