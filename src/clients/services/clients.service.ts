import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
   * @throws `InternalServerErrorException` when an unexpected error occurs while saving the IP address from the client
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

      throw new InternalServerErrorException({
        error: error.name,
        message: error.message
      });
    }
  }

  /**
   * Finds the client with the given IP address and returns it.
   *
   * @param ipAddress The IP address from the client to search for
   * @throws `InternalServerErrorException` when an unexpected error occurs while trying to retrieve the client information
   * @throws `NotFoundException` when the client is not found
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

      throw new NotFoundException({
        error: 'ClientNotFound',
        message: 'No client object was found'
      });
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this._CONSOLE_LOGGER_SERVICE.error(
        `Error retrieving client information: ${error}`
      );

      throw new InternalServerErrorException({
        error: error.name,
        message: error.message
      });
    }
  }
}
