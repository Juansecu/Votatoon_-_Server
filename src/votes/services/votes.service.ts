import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { getClientIp } from 'request-ip';
import { Repository } from 'typeorm';

import { ISuccessResponseMessage } from '../../shared/typings/SuccessResponseMessage';

import { RaceDto } from '../../races/dtos/Race.dto';

import { EContestantType } from '../../contestants/enums/Contestant';

import { ClientVoteEntity } from '../entities/client-vote.entity';
import { CurrentVoteEntity } from '../entities/current-vote.entity';
import { VoteTotalEntity } from '../entities/vote-total.entity';
import { ClientEntity } from '../../clients/entities/client.entity';

import { ClientsService } from '../../clients/services/clients.service';
import { ConsoleLoggerService } from '../../loggers/services/console-logger/console-logger.service';
import { RacesService } from '../../races/services/races.service';

import { CryptoUtil } from '../../shared/utils/crypto.util';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(ClientVoteEntity)
    private readonly _CLIENT_VOTES_REPOSITORY: Repository<ClientVoteEntity>,
    private readonly _CLIENTS_SERVICE: ClientsService,
    private readonly _CONSOLE_LOGGER_SERVICE: ConsoleLoggerService,
    private readonly _CRYPTO_UTIL: CryptoUtil,
    @InjectRepository(CurrentVoteEntity)
    private readonly _CURRENT_VOTES_REPOSITORY: Repository<CurrentVoteEntity>,
    private readonly _RACES_SERVICE: RacesService,
    @InjectRepository(VoteTotalEntity)
    private readonly _VOTES_TOTAL_REPOSITORY: Repository<VoteTotalEntity>
  ) {}

  /**
   * Gets the total number of votes for the given type of contestant.
   *
   * @param contestantType Contestant type to retrieve total votes for
   * @throws `InternalServerErrorException` when there is an unexpected error when retrieving the total votes for the current contestant
   * @throws `NotFoundException` when no total votes are found for the current contestant
   * @returns `Promise<VoteTotalEntity>`
   */
  async getVoteTotalByContestantType(
    contestantType: EContestantType
  ): Promise<VoteTotalEntity> {
    try {
      const { id }: RaceDto = await this._RACES_SERVICE.getCurrentRace();
      const voteTotal: VoteTotalEntity =
        await this._VOTES_TOTAL_REPOSITORY.findOne({
          where: {
            contestantType,
            raceId: id
          }
        });

      if (voteTotal) {
        this._CONSOLE_LOGGER_SERVICE.log(
          `Vote total for contestant type ${contestantType} on race ${id} found. Returning...`
        );

        return voteTotal;
      }

      this._CONSOLE_LOGGER_SERVICE.error(
        `No total votes found for contestant type ${contestantType} on race ${id} Throwing NotFoundException...`
      );

      throw new NotFoundException({
        error: 'VoteTotalNotFound',
        message: 'No vote-total object was found'
      });
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this._CONSOLE_LOGGER_SERVICE.error(
        `Error retrieving total vote amount for contestant type ${contestantType} on the current race: ${error}`
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
   * @returns `Promise<ISuccessResponseMessage>`
   */
  async vote(
    contestantType: EContestantType,
    request: Request
  ): Promise<ISuccessResponseMessage> {
    this._CONSOLE_LOGGER_SERVICE.debug('Initializing vote service...');

    if (!this._CRYPTO_UTIL.isCryptographicInfoValid()) {
      this._CONSOLE_LOGGER_SERVICE.error(
        'Cryptographical information is required to encrypt/decrypt IP address from the clients'
      );

      throw new InternalServerErrorException({
        error: 'UnavailableService',
        message: 'This service is temporarily unavailable'
      });
    }

    let client: ClientEntity;

    const encryptedIpAddress: string = this._CRYPTO_UTIL.encrypt(
      getClientIp(request)
    );
    const { raceId, voteTotalId }: VoteTotalEntity =
      await this.getVoteTotalByContestantType(contestantType);

    try {
      client = await this._CLIENTS_SERVICE.getClientByIpAddress(
        encryptedIpAddress
      );

      if (client) {
        const currentVoteInformation: CurrentVoteEntity =
          await this._CURRENT_VOTES_REPOSITORY.findOne({
            where: {
              active: 1,
              ipAddress: client.ipAddress
            }
          });

        // TODO: Add current vote to the current client with addVoteToCurrentClient method.
        if (!currentVoteInformation) {
          await this.addVoteToClient(client.clientId, raceId, voteTotalId);

          return {
            success: true,
            message: 'Vote saved'
          };
        }

        throw new ConflictException({
          error: 'ExistingVote',
          message: 'There is already a current vote for this client'
        });
      }

      client = await this._CLIENTS_SERVICE.addClient(encryptedIpAddress);

      await this.addVoteToClient(client.clientId, raceId, voteTotalId);

      return {
        success: true,
        message: 'Vote saved'
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this._CONSOLE_LOGGER_SERVICE.error(
        `Error voting for contestant ${contestantType} on race ${raceId}: ${error}`
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
   * @param voteTotalId Current vote total for contestant
   * @throws `InternalServerErrorException` when there is an error associating the vote with current connected client
   */
  private async addVoteToClient(
    clientId: number,
    raceId: number,
    voteTotalId: number
  ): Promise<void> {
    try {
      const newClientVote: ClientVoteEntity = new ClientVoteEntity();

      newClientVote.clientId = clientId;
      newClientVote.raceId = raceId;
      newClientVote.voteTotalId = voteTotalId;

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
