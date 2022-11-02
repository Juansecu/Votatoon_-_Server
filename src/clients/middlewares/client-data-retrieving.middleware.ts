import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { getClientIp } from 'request-ip';

import { IRequestClientData } from '../typings/Request';

import { EErrorCode } from '../../core/enums/error-code.enum';

import { VotatoonInternalServerErrorException } from '../../core/exceptions/votatoon-internal-server-error.exception';

import { ClientEntity } from '../entities/client.entity';

import { ClientsService } from '../services/clients.service';
import { ConsoleLoggerService } from '../../loggers/services/console-logger/console-logger.service';

import { CryptoUtil } from '../../shared/utils/crypto.util';
import { setValue } from '../../shared/utils/functions/setValue.function';

@Injectable()
export class ClientDataRetrievingMiddleware implements NestMiddleware {
  constructor(
    private readonly _CLIENTS_SERVICE: ClientsService,
    private readonly _CONSOLE_LOGGER_SERVICE: ConsoleLoggerService,
    private readonly _CRYPTO_UTIL: CryptoUtil
  ) {}

  /**
   * Retrieves the client data from the database and adds it to the request.
   *
   * If the client data is not found, a new client is created and added to the request.
   *
   * @param request The request object
   * @param response The response object
   * @param next The next function
   * @throws `VotatoonInternalServerErrorException` when the client data cannot be retrieved
   */
  async use(
    request: IRequestClientData,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    let client: ClientEntity;

    const encryptedIpAddress: string = this._CRYPTO_UTIL.encrypt(
      getClientIp(request)
    );

    try {
      client = await this._CLIENTS_SERVICE.getClientByIpAddress(
        encryptedIpAddress
      );

      setValue(request, 'data.client', client);

      next();
    } catch (error) {
      if (error instanceof NotFoundException) {
        this._CONSOLE_LOGGER_SERVICE.warn(
          `Client not found. Creating a new one...`
        );

        client = await this._CLIENTS_SERVICE.addClient(encryptedIpAddress);

        setValue(request, 'data.client', client);

        next();

        return;
      }

      this._CONSOLE_LOGGER_SERVICE.error(
        `Error retrieving client data: ${error}`
      );

      throw new VotatoonInternalServerErrorException({
        error: EErrorCode.CLIENT_NOT_PROCESSED,
        message: 'Error processing client data'
      });
    }
  }
}
