import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ContestantEntity } from '../entities/contestant.entity';

import { ConsoleLoggerService } from 'src/loggers/services/console-logger/console-logger.service';

@Injectable()
export class ContestantsService {
  constructor(
    private readonly _CONSOLE_LOGGER_SERVICE: ConsoleLoggerService,
    @InjectRepository(ContestantEntity)
    private readonly _CONTESTANTS_REPOSITORY: Repository<ContestantEntity>
  ) {}

  async getContestantsById(
    contestantIds: number[]
  ): Promise<ContestantEntity[]> {
    try {
      this._CONSOLE_LOGGER_SERVICE.verbose(
        `Getting contestants by IDs: ${contestantIds}`
      );

      return await this._CONTESTANTS_REPOSITORY.findByIds(contestantIds);
    } catch (error) {
      this._CONSOLE_LOGGER_SERVICE.error(
        `Error getting contestants by IDs: ${contestantIds}`
      );
      this._CONSOLE_LOGGER_SERVICE.error(error);

      throw new InternalServerErrorException({
        error: error.name,
        message: error.message
      });
    }
  }
}
