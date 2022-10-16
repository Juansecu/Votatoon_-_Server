import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  /**
   * Gets the current active race.
   *
   * @throws `InternalServerErrorException` if there is an unexpected exception when trying to get the current race from the database
   * @throws `NotFoundException` if there are no records for a current active race
   * @throws `NotFoundException` if not-enough records (2) were found for the current race
   * @returns `Promise<RaceDto>`
   */
  async getCurrentRace(): Promise<RaceDto> {
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
          this.throwNoRaceAmountEnoughException(
            currentRaceInformation[0].raceId
          );

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

  /**
   * Gets the information of the last two races.
   *
   * @throws `InternalServerErrorException` if there is an unexpected exception when trying to get the races from the database
   * @throws `NotFoundException` if there are no records for any of the current races
   * @throws `NotFoundException` if not-enough records (2) were found for any of the current races
   * @returns `Promise<RaceDto[]>`
   */
  async getRaceList(): Promise<RaceDto[]> {
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

        if (filteredRaces.length !== 2)
          this.throwNoRaceAmountEnoughException(raceId);

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

  /**
   * Creates the response for the given race information.
   *
   * @param raceInformation Votes for contestants **a** and **b**
   * @param index Index for the current race information. It's **0** by default
   * @returns `RaceDto`
   */
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

  /**
   * Throws `NotFoundException` indicating that the current amount of total votes was not found.
   *
   * @param raceId Id of the race from which the total votes was not found
   * @throws `NotFoundException` indicating that the current amount of total votes was not found.
   */
  private throwNoRaceAmountEnoughException(raceId: number): void {
    this._CONSOLE_LOGGER_SERVICE.error(
      `Not necessary amount of total votes was found for the race with ID ${raceId}`
    );

    throw new NotFoundException({
      error: 'NoAmountEnough',
      message: 'Not necessary amount of votesTotal was found'
    });
  }
}
