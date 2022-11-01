import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IRequestClientData } from '../../clients/typings/Request';
import { ISuccessResponseMessage } from '../../shared/typings/SuccessResponseMessage';
import { TOrderByClause, TWhereClause } from '../../shared/typings/TypeORM';

import { EContestantType } from '../../contestants/enums/contestant-type.enum';

import { ClientVoteEntity } from '../entities/client-vote.entity';
import { ContestantVoteEntity } from '../entities/contestant-vote.entity';
import { VoteEntity } from '../entities/vote.entity';
import { ClientEntity } from '../../clients/entities/client.entity';

import { ConsoleLoggerService } from '../../loggers/services/console-logger/console-logger.service';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(ClientVoteEntity)
    private readonly _CLIENT_VOTES_REPOSITORY: Repository<ClientVoteEntity>,
    private readonly _CONSOLE_LOGGER_SERVICE: ConsoleLoggerService,
    @InjectRepository(ContestantVoteEntity)
    private readonly _CONTESTANT_VOTES_REPOSITORY: Repository<ContestantVoteEntity>,
    @InjectRepository(VoteEntity)
    private readonly _VOTES_REPOSITORY: Repository<VoteEntity>
  ) {}

  /**
   * Validates the vote records for a given race ID.
   *
   * Checks:
   * - If the amount of the records is equals to 2.
   * - If the records belong to the given race ID.
   * - If the first record is for the contestant type `a`.
   * - If the second record is for the contestant type `b`.
   *
   * If any of the checks fails, an exception is thrown.
   *
   * @param raceInformationRecords The records to validate
   * @param raceId Id of the race to validate
   * @throws `NotFoundException` when the records are invalid
   */
  checkRaceContestantVotesRecords(
    raceInformationRecords: [ContestantVoteEntity, ContestantVoteEntity],
    raceId: number
  ): void {
    if (raceInformationRecords.length !== 2) {
      this._CONSOLE_LOGGER_SERVICE.error(
        `Not necessary amount of total votes was found for the race with ID ${raceId}`
      );

      throw new NotFoundException({
        error: 'NoRecordsAmountEnough',
        message: 'Not necessary amount of votesTotal was found'
      });
    }

    const matchRaceId: boolean = raceInformationRecords.every(
      (raceInformation: ContestantVoteEntity) =>
        raceInformation.raceId === raceId
    );

    if (!matchRaceId) {
      this._CONSOLE_LOGGER_SERVICE.error(
        `ID ${raceId} does not match for both records`
      );

      throw new NotFoundException({
        error: 'NoRecordsAmountEnough',
        message: 'Not necessary amount of votesTotal was found'
      });
    }

    if (raceInformationRecords[0].contestantType != EContestantType.A) {
      this._CONSOLE_LOGGER_SERVICE.error(
        `The first record is not for Contestant A on race with ID ${raceId}`
      );

      throw new NotFoundException({
        error: 'NoRecordsAmountEnough',
        message: 'Not necessary amount of votesTotal was found'
      });
    }

    if (raceInformationRecords[1].contestantType != EContestantType.B) {
      this._CONSOLE_LOGGER_SERVICE.error(
        `The second record is not for Contestant B on race with ID ${raceId}`
      );

      throw new NotFoundException({
        error: 'NoRecordsAmountEnough',
        message: 'Not necessary amount of votesTotal was found'
      });
    }
  }

  /**
   * Gets the total votes for the contestants of the races.
   *
   * @param where Where conditions
   * @param order Order by clause
   * @param take Limit of records to get
   * @throws `InternalServerErrorException` when there is an error getting the votes
   * @returns `Promise<ContestantVoteEntity[]>`
   */
  async getContestantVotes(
    where: TWhereClause<ContestantVoteEntity> = {},
    order: TOrderByClause<ContestantVoteEntity> = {},
    take = 0
  ): Promise<ContestantVoteEntity[]> {
    try {
      if (take > 0) {
        return await this._CONTESTANT_VOTES_REPOSITORY.find({
          order,
          take,
          where
        });
      }

      return await this._CONTESTANT_VOTES_REPOSITORY.find({
        order,
        where
      });
    } catch (error) {
      this._CONSOLE_LOGGER_SERVICE.error(
        `Error getting votes for the contestants: ${error}`
      );

      throw new InternalServerErrorException({
        error: error.name,
        message: error.message
      });
    }
  }

  /**
   * Creates a new vote for the current connected client.
   *
   * @param contestantType Contestant type
   * @param request The request object
   * @throws `ConflictException` when the client has already voted
   * @throws `InternalServerErrorException` when there is an error creating the vote
   * @returns `Promise<ISuccessResponseMessage>`
   */
  async vote(
    contestantType: EContestantType,
    request: IRequestClientData
  ): Promise<ISuccessResponseMessage> {
    try {
      this._CONSOLE_LOGGER_SERVICE.debug('Initializing vote service...');

      const { clientId, ipAddress }: ClientEntity = request.data.client;
      const { contestantId, raceContestantId, raceId }: ContestantVoteEntity =
        await this._CONTESTANT_VOTES_REPOSITORY.findOne({
          select: ['contestantId', 'raceContestantId', 'raceId'],
          where: {
            contestantType,
            active: 1
          }
        });
      const currentVoteInformation: VoteEntity =
        await this._VOTES_REPOSITORY.findOne({
          where: {
            active: 1,
            ipAddress
          }
        });

      // TODO: Add current vote to the current client with addVoteToCurrentClient method.
      if (!currentVoteInformation) {
        await this.addVoteToClient(
          clientId,
          raceId,
          raceContestantId,
          contestantId
        );

        this._CONSOLE_LOGGER_SERVICE.log(
          `Vote added to the client with ID ${clientId}`
        );

        return {
          success: true,
          message: 'Vote saved'
        };
      }

      this._CONSOLE_LOGGER_SERVICE.error(
        `The client with ID ${clientId} has already voted`
      );

      throw new ConflictException({
        error: 'ExistingVote',
        message: 'There is already a current vote for this client'
      });
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this._CONSOLE_LOGGER_SERVICE.error(
        `Error voting for contestant ${contestantType} on the current race: ${error}`
      );

      throw new InternalServerErrorException({
        error: error.name,
        message: error.message
      });
    }
  }

  /**
   * Saves new vote for the current connected client.
   *
   * @param clientId Current client ID
   * @param raceId Current active race ID
   * @param raceContestantId Current race contestant ID
   * @param contestantId Current contestant ID
   * @throws `InternalServerErrorException` when there is an error associating the vote with current connected client
   */
  private async addVoteToClient(
    clientId: number,
    raceId: number,
    raceContestantId: number,
    contestantId: number
  ): Promise<void> {
    try {
      const newClientVote: ClientVoteEntity = new ClientVoteEntity();

      newClientVote.clientId = clientId;
      newClientVote.contestantId = contestantId;
      newClientVote.raceId = raceId;
      newClientVote.raceContestantId = raceContestantId;

      await this._CLIENT_VOTES_REPOSITORY.save(newClientVote);
    } catch (error) {
      this._CONSOLE_LOGGER_SERVICE.error(
        `Error saving vote for new client on race ${raceId}: ${error}`
      );

      throw new InternalServerErrorException({
        error: error.name,
        message: error.message
      });
    }
  }
}
