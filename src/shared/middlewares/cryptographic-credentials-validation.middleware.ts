import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { EErrorCode } from '../../core/enums/error-code.enum';

import { VotatoonInternalServerErrorException } from '../../core/exceptions/votatoon-internal-server-error.exception';

import { ConsoleLoggerService } from '../../loggers/services/console-logger/console-logger.service';

import { CryptoUtil } from '../utils/crypto.util';

@Injectable()
export class CryptographicCredentialsValidationMiddleware
  implements NestMiddleware
{
  constructor(
    private readonly _CONSOLE_LOGGER_SERVICE: ConsoleLoggerService,
    private readonly _CRYPTO_UTIL: CryptoUtil
  ) {}

  /**
   * Validates the cryptographic credentials.
   *
   * @param request The request object
   * @param response The response object
   * @param next The next function
   * @throws `VotatoonInternalServerErrorException` when the cryptographic credentials are invalid
   */
  use(request: Request, response: Response, next: NextFunction): void {
    this._CONSOLE_LOGGER_SERVICE.debug(
      `Validating the cryptographic credentials...`
    );

    if (!this._CRYPTO_UTIL.isCryptographicInfoValid()) {
      this._CONSOLE_LOGGER_SERVICE.error(
        'Cryptographical information is required to encrypt/decrypt IP address from the clients'
      );

      throw new VotatoonInternalServerErrorException({
        error: EErrorCode.UNAVAILABLE_SERVICE,
        message: 'This service is temporarily unavailable'
      });
    }

    next();
  }
}
