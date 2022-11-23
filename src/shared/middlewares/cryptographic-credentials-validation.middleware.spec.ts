import { Test, TestingModule } from '@nestjs/testing';
import { request, response } from 'express';

import { next } from '../mocks/next-function.mock';

import { CryptographicCredentialsValidationMiddleware } from './cryptographic-credentials-validation.middleware';

import { ConsoleLoggerService } from '../../loggers/services/console-logger/console-logger.service';

import { CryptoUtil } from '../utils/crypto.util';

describe('CryptographicCredentialsValidationMiddleware', () => {
  let cryptographicCredentialsValidationMiddleware: CryptographicCredentialsValidationMiddleware;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsoleLoggerService,
        CryptographicCredentialsValidationMiddleware,
        CryptoUtil
      ]
    }).compile();

    cryptographicCredentialsValidationMiddleware =
      module.get<CryptographicCredentialsValidationMiddleware>(
        CryptographicCredentialsValidationMiddleware
      );
  });

  it('cryptographicCredentialsValidationMiddleware should be defined', () => {
    expect(cryptographicCredentialsValidationMiddleware).toBeDefined();
  });

  describe('use', () => {
    it('should call next() function', () => {
      cryptographicCredentialsValidationMiddleware.use(request, response, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
