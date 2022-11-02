import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EErrorCode } from '../../core/enums/error-code.enum';

import { VotatoonInternalServerErrorException } from '../../core/exceptions/votatoon-internal-server-error.exception';
import { VotatoonNotFoundException } from '../../core/exceptions/votatoon-not-found.exception';

import { ClientEntity } from '../entities/client.entity';

import { ConsoleLoggerService } from '../../loggers/services/console-logger/console-logger.service';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly _CLIENTS_REPOSITORY: Repository<ClientEntity>,
    private readonly _CONSOLE_LOGGER_SERVICE: ConsoleLoggerService
  ) {}

  /**
   * Saves IP address from the client.
   *
   * @param ipAddress The IP address from the client to save
   * @throws `VotatoonInternalServerErrorException` when an unexpected error occurs while saving the IP address from the client
   * @returns `Promise<ClientEntity>`
   */
  async addClient(ipAddress: string): Promise<ClientEntity> {
    try {
      this._CONSOLE_LOGGER_SERVICE.verbose('Saving new client...');

      const newClient: ClientEntity = new ClientEntity();
      newClient.ipAddress = ipAddress;
      return this._CLIENTS_REPOSITORY.save(newClient);
    } catch (error) {
      this._CONSOLE_LOGGER_SERVICE.error(`Error saving new client: ${error}`);

      throw new VotatoonInternalServerErrorException({
        error: EErrorCode.INTERNAL_SERVER_ERROR,
        message: 'Error saving new client'
      });
    }
  }

  /**
   * Finds the client with the given IP address and returns it.
   *
   * @param ipAddress The IP address from the client to search for
   * @throws `VotatoonInternalServerErrorException` when an unexpected error occurs while trying to retrieve the client information
   * @throws `VotatoonNotFoundException` when the client is not found
   * @returns `Promise<ClientEntity>`
   */
  async getClientByIpAddress(ipAddress: string): Promise<ClientEntity> {
    try {
      this._CONSOLE_LOGGER_SERVICE.verbose(
        'Retrieving client by IP address...'
      );

      const client: ClientEntity = await this._CLIENTS_REPOSITORY.findOne({
        where: {
          ipAddress
        }
      });

      if (client) {
        this._CONSOLE_LOGGER_SERVICE.log(
          'Client information retrieved. Returning information...'
        );

        return client;
      }

      this._CONSOLE_LOGGER_SERVICE.error(
        'No client information retrieved. Returning NotFoundException...'
      );

      throw new VotatoonNotFoundException({
        error: EErrorCode.CLIENT_NOT_FOUND,
        message: 'No client object found'
      });
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this._CONSOLE_LOGGER_SERVICE.error(
        `Error retrieving client information: ${error}`
      );

      throw new VotatoonInternalServerErrorException({
        error: EErrorCode.INTERNAL_SERVER_ERROR,
        message: 'Error retrieving client information'
      });
    }
  }
}
