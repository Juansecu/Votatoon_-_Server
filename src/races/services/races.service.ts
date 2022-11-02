import { HttpException, Injectable } from '@nestjs/common';

import { EErrorCode } from '../../core/enums/error-code.enum';

import { VotatoonInternalServerErrorException } from '../../core/exceptions/votatoon-internal-server-error.exception';
import { VotatoonNotFoundException } from '../../core/exceptions/votatoon-not-found.exception';

import { ContestantVoteEntity } from '../../votes/entities/contestant-vote.entity';

import { RaceDto } from '../dtos/Race.dto';

import { ConsoleLoggerService } from '../../loggers/services/console-logger/console-logger.service';
import { VotesService } from '../../votes/services/votes.service';

@Injectable()
export class RacesService {
  constructor(
    private readonly _CONSOLE_LOGGER_SERVICE: ConsoleLoggerService,
    private readonly _VOTES_SERVICE: VotesService
  ) {}

  /**
   * Gets the current active race.
   *
   * @throws `VotatoonInternalServerErrorException` if there is an unexpected exception when trying to get the current race from the database
   * @throws `VotatoonNotFoundException` if there are no records for a current active race
   * @returns `Promise<RaceDto>`
   */
  async getCurrentRace(): Promise<RaceDto> {
    try {
      this._CONSOLE_LOGGER_SERVICE.verbose('Getting current race...');

      const currentRaceInformation: [
        ContestantVoteEntity,
        ContestantVoteEntity
      ] = (await this._VOTES_SERVICE.getContestantVotes({
        active: 1
      })) as [ContestantVoteEntity, ContestantVoteEntity];

      if (currentRaceInformation.length) {
        this._VOTES_SERVICE.checkRaceContestantVotesRecords(
          currentRaceInformation,
          currentRaceInformation[0].raceId
        );

        this._CONSOLE_LOGGER_SERVICE.log(
          'Race information retrieved. Returning information...'
        );

        return this.createRaceInformationResponse(currentRaceInformation);
      }

      this._CONSOLE_LOGGER_SERVICE.error('No current race was found');

      throw new VotatoonNotFoundException({
        error: EErrorCode.NO_ACTIVE_RACE,
        message: 'No active-race was found'
      });
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this._CONSOLE_LOGGER_SERVICE.error(
        `Error getting the current race: ${error}`
      );

      throw new VotatoonInternalServerErrorException({
        error: EErrorCode.INTERNAL_SERVER_ERROR,
        message: 'Error getting the current race'
      });
    }
  }

  /**
   * Gets the information of the last two races.
   *
   * @throws `VotatoonInternalServerErrorException` when there is an unexpected exception while trying to get the races from the database
   * @returns `Promise<RaceDto[]>`
   */
  async getRaceList(): Promise<RaceDto[]> {
    try {
      this._CONSOLE_LOGGER_SERVICE.verbose('Getting race list...');

      const raceIds: Set<number> = new Set();
      const races: [ContestantVoteEntity, ContestantVoteEntity][] = [];
      const raceList: RaceDto[] = [];
      const racesInformation: ContestantVoteEntity[] =
        await this._VOTES_SERVICE.getContestantVotes(
          {},
          {
            raceId: 'DESC'
          },
          4
        );

      for (const raceInformation of racesInformation)
        raceIds.add(raceInformation.raceId);

      for (const raceId of raceIds.values()) {
        const filteredRaces: [ContestantVoteEntity, ContestantVoteEntity] =
          racesInformation.filter(race => race.raceId === raceId) as [
            ContestantVoteEntity,
            ContestantVoteEntity
          ];

        filteredRaces.sort((a, b) => a.raceContestantId - b.raceContestantId);

        this._VOTES_SERVICE.checkRaceContestantVotesRecords(
          filteredRaces,
          raceId
        );

        races.push(filteredRaces);
      }

      races.sort(
        (a: ContestantVoteEntity[], b: ContestantVoteEntity[]) =>
          a[0].raceId - b[0].raceId
      );

      for (let i = 0; i < races.length; i++) {
        const raceInformation: RaceDto = this.createRaceInformationResponse(
          races[i],
          i
        );

        raceList.push(raceInformation);
      }

      this._CONSOLE_LOGGER_SERVICE.log(
        'Race list retrieved. Returning information...'
      );

      return raceList;
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this._CONSOLE_LOGGER_SERVICE.error(
        `Error getting the race list: ${error}`
      );

      throw new VotatoonInternalServerErrorException({
        error: EErrorCode.INTERNAL_SERVER_ERROR,
        message: 'Error getting the race list'
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
    raceInformation: [ContestantVoteEntity, ContestantVoteEntity],
    index = 0
  ): RaceDto {
    const contestantA: ContestantVoteEntity = raceInformation[0];
    const contestantB: ContestantVoteEntity = raceInformation[1];

    contestantA.voteTotalValue = Number(contestantA.voteTotalValue);
    contestantB.voteTotalValue = Number(contestantB.voteTotalValue);

    return {
      id: contestantA.raceId,
      index: index,
      toonA: contestantA.name,
      toonB: contestantB.name,
      aVotesPercent: Math.round(
        (contestantA.voteTotalValue /
          (contestantA.voteTotalValue + contestantB.voteTotalValue)) *
          100
      ),
      bVotesPercent: Math.round(
        (contestantB.voteTotalValue /
          (contestantA.voteTotalValue + contestantB.voteTotalValue)) *
          100
      ),
      aVotesTotal: contestantA.voteTotalValue,
      bVotesTotal: contestantB.voteTotalValue,
      aSmallImagePath: contestantA.smallImagePath,
      bSmallImagePath: contestantB.smallImagePath,
      aLargeImagePath: contestantA.largeImagePath,
      bLargeImagePath: contestantB.largeImagePath,
      active: contestantA.active ? true : false
    };
  }
}
