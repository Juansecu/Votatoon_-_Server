import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IErrorResponseMessage } from '../../shared/typings/ErrorResponseMessage';

import { RaceDto } from '../dtos/Race.dto';

import { RaceInformationEntity } from '../entities/race-information.entity';

import { ConsoleLoggerService } from '../../loggers/services/console-logger/console-logger.service';

@Injectable()
export class RacesService {
  constructor(
    private readonly _CONSOLE_LOGGER_SERVICE: ConsoleLoggerService,
    @InjectRepository(RaceInformationEntity)
    private readonly _V_RACES_INFORMATION_REPOSITORY: Repository<RaceInformationEntity>
  ) {}

  async getCurrentRace(): Promise<RaceDto | IErrorResponseMessage> {
    try {
      this._CONSOLE_LOGGER_SERVICE.verbose('Getting current race...');

      const currentRaceInformation: RaceInformationEntity[] =
        await this._V_RACES_INFORMATION_REPOSITORY.find({
          where: {
            active: 1
          }
        });

      if (currentRaceInformation.length) {
        if (currentRaceInformation.length !== 2)
          this.throwNoRaceAmountEnoughException();

        this._CONSOLE_LOGGER_SERVICE.log(
          'Race information retrieved. Returning information...'
        );

        return this.createRaceInformationResponse(currentRaceInformation);
      }

      this._CONSOLE_LOGGER_SERVICE.error('No current race was found');

      throw new NotFoundException({
        error: 'NoActiveRace',
        message: 'No active-race was found'
      });
    } catch (error) {
      this._CONSOLE_LOGGER_SERVICE.error(
        `Error getting the current race: ${error}`
      );

      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException({
        error: error.name,
        message: error.message
      });
    }
  }

  async getRaceList(): Promise<RaceDto[] | IErrorResponseMessage> {
    try {
      this._CONSOLE_LOGGER_SERVICE.verbose('Getting race list...');

      const raceIds: Set<number> = new Set();
      const races: RaceInformationEntity[][] = [];
      const racesInformation: RaceInformationEntity[] =
        await this._V_RACES_INFORMATION_REPOSITORY.find({
          order: {
            raceId: 'DESC'
          },
          take: 4
        });
      const raceList: RaceDto[] = [];

      for (const raceInformation of racesInformation)
        raceIds.add(raceInformation.raceId);

      for (const raceId of raceIds.values()) {
        const filteredRaces: RaceInformationEntity[] = racesInformation.filter(
          race => race.raceId === raceId
        );

        if (filteredRaces.length !== 2) this.throwNoRaceAmountEnoughException();

        races.push(filteredRaces);
      }

      races.sort(
        (a: RaceInformationEntity[], b: RaceInformationEntity[]) =>
          a[0].raceId - b[0].raceId
      );

      for (let i = 0; i < races.length; i++) {
        const raceInformation: RaceDto = this.createRaceInformationResponse(
          races[i]
        );

        raceList.push(raceInformation);
      }

      this._CONSOLE_LOGGER_SERVICE.log(
        'Race list retrieved. Returning information...'
      );

      return raceList;
    } catch (error) {
      this._CONSOLE_LOGGER_SERVICE.error(
        `Error getting the race list: ${error}`
      );

      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException({
        error: error.name,
        message: error.message
      });
    }
  }

  private createRaceInformationResponse(
    raceInformation: RaceInformationEntity[],
    index = 0
  ): RaceDto {
    return {
      id: raceInformation[0].raceId,
      index: index,
      toonA: raceInformation[0].name,
      toonB: raceInformation[1].name,
      aVotesPercent: Math.round(
        (raceInformation[0].voteTotalValue /
          (raceInformation[0].voteTotalValue +
            raceInformation[1].voteTotalValue)) *
          100
      ),
      bVotesPercent: Math.round(
        (raceInformation[1].voteTotalValue /
          (raceInformation[0].voteTotalValue +
            raceInformation[1].voteTotalValue)) *
          100
      ),
      aVotesTotal: raceInformation[0].voteTotalValue,
      bVotesTotal: raceInformation[1].voteTotalValue,
      aSmallImagePath: raceInformation[0].smallImagePath,
      bSmallImagePath: raceInformation[1].smallImagePath,
      aLargeImagePath: raceInformation[0].largeImagePath,
      bLargeImagePath: raceInformation[1].largeImagePath,
      active: raceInformation[0].active ? true : false
    };
  }

  private throwNoRaceAmountEnoughException(): void {
    this._CONSOLE_LOGGER_SERVICE.error(
      'Not necessary amount of total votes was found'
    );

    throw new NotFoundException({
      error: 'NoAmountEnough',
      message: 'Not necessary amount of votesTotal was found'
    });
  }
}
