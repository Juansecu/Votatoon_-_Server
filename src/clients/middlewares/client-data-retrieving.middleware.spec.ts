import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { request, response } from 'express';

import { IRequestClientData } from '../typings/Request';

import { EErrorCode } from '../../core/enums/error-code.enum';

import { ClientEntity } from '../entities/client.entity';

import { next } from '../../shared/mocks/next-function.mock';
import { clientsRepository } from '../mocks/factories/clients-repository.mock-factory';

import { VotatoonInternalServerErrorException } from '../../core/exceptions/votatoon-internal-server-error.exception';

import { ClientDataRetrievingMiddleware } from './client-data-retrieving.middleware';

import { ConsoleLoggerService } from '../../loggers/services/console-logger/console-logger.service';

import { ClientsService } from '../services/clients.service';

import { CryptoUtil } from '../../shared/utils/crypto.util';

describe('ClientDataRetrievingMiddleware', () => {
  let clientDataRetrievingMiddleware: ClientDataRetrievingMiddleware;
  let cryptoUtil: CryptoUtil;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        ClientDataRetrievingMiddleware,
        ConsoleLoggerService,
        CryptoUtil,
        {
          provide: getRepositoryToken(ClientEntity),
          useFactory: clientsRepository
        }
      ]
    }).compile();

    clientDataRetrievingMiddleware = module.get<ClientDataRetrievingMiddleware>(
      ClientDataRetrievingMiddleware
    );
    cryptoUtil = module.get<CryptoUtil>(CryptoUtil);
  });

  it('clientDataRetrievingMiddleware should be defined', () => {
    expect(clientDataRetrievingMiddleware).toBeDefined();
  });

  it('cryptoUtil should be defined', () => {
    expect(cryptoUtil).toBeDefined();
  });

  describe('use', () => {
    const client: ClientEntity = new ClientEntity();

    beforeAll(() => {
      client.ipAddress = cryptoUtil.encrypt('::1');

      clientsRepository.mockImplementationOnce(() => ({
        findOne: () => Promise.resolve(client)
      }));
    });

    it('#1 should retrieve client data and add it to the request object', async () => {
      request.headers['x-client-ip'] = '::1';

      await clientDataRetrievingMiddleware.use(
        request as IRequestClientData,
        response,
        next
      );

      expect((request as IRequestClientData).data.client).toBeDefined();
      expect((request as IRequestClientData).data.client).toEqual(client);
      expect(next).toHaveBeenCalled();
    });

    it('#2 should create a new client and add it to the request object', async () => {
      clientsRepository.mockImplementationOnce(() => ({
        save: () => Promise.resolve(client)
      }));

      request.headers['x-client-ip'] = '::1';

      await clientDataRetrievingMiddleware.use(
        request as IRequestClientData,
        response,
        next
      );

      expect((request as IRequestClientData).data.client).toBeDefined();
      expect(next).toHaveBeenCalled();
    });

    it('#3 should throw an error when the client data cannot be retrieved', async () => {
      clientsRepository.mockImplementationOnce(() => ({
        findOne: () => Promise.reject(new Error('Error'))
      }));

      request.headers['x-client-ip'] = '::1';

      await expect(() =>
        clientDataRetrievingMiddleware.use(
          request as IRequestClientData,
          response,
          next
        )
      ).rejects.toThrowError(
        new VotatoonInternalServerErrorException({
          error: EErrorCode.CLIENT_NOT_PROCESSED,
          message: 'Error processing client data'
        })
      );
    });
  });
});
