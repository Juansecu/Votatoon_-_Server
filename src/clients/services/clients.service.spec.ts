import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { EErrorCode } from '../../core/enums/error-code.enum';

import { ClientEntity } from '../entities/client.entity';

import { clientsRepository } from '../mocks/factories/clients-repository.mock-factory';

import { VotatoonInternalServerErrorException } from '../../core/exceptions/votatoon-internal-server-error.exception';
import { VotatoonNotFoundException } from '../../core/exceptions/votatoon-not-found.exception';

import { ClientsService } from './clients.service';
import { ConsoleLoggerService } from '../../loggers/services/console-logger/console-logger.service';

import { CryptoUtil } from '../../shared/utils/crypto.util';

describe('ClientsService', () => {
  let clientsService: ClientsService;
  let cryptoUtil: CryptoUtil;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        ConsoleLoggerService,
        CryptoUtil,
        {
          provide: getRepositoryToken(ClientEntity),
          useFactory: clientsRepository
        }
      ]
    }).compile();

    clientsService = module.get<ClientsService>(ClientsService);
    cryptoUtil = module.get<CryptoUtil>(CryptoUtil);
  });

  it('clientsService should be defined', () => {
    expect(clientsService).toBeDefined();
  });

  it('cryptoUtil should be defined', () => {
    expect(cryptoUtil).toBeDefined();
  });

  describe('addClient', () => {
    const client: ClientEntity = new ClientEntity();

    beforeAll(() => {
      client.ipAddress = cryptoUtil.encrypt('::1');

      clientsRepository.mockImplementationOnce(() => ({
        save: () => Promise.resolve(client)
      }));
    });

    it('#1 should save new client', async () => {
      const newClient: ClientEntity = await clientsService.addClient(
        client.ipAddress
      );

      expect(newClient).toBeDefined();
      expect(newClient).toBeInstanceOf(ClientEntity);
      expect(newClient.ipAddress).toEqual(client.ipAddress);
    });
  });

  describe('getClientByIpAddress', () => {
    const client: ClientEntity = new ClientEntity();

    beforeAll(() => {
      client.ipAddress = cryptoUtil.encrypt('::1');

      clientsRepository
        .mockImplementationOnce(() => ({
          findOne: () => Promise.resolve(client)
        }))
        .mockImplementationOnce(() => ({
          findOne: () => Promise.resolve(null)
        }))
        .mockImplementationOnce(() => ({
          findOne: () => Promise.reject(new Error())
        }));
    });

    it('#1 should return client by ip address', async () => {
      const foundClient: ClientEntity =
        await clientsService.getClientByIpAddress(client.ipAddress);

      expect(foundClient).toBeDefined();
      expect(foundClient).toBeInstanceOf(ClientEntity);
      expect(foundClient.ipAddress).toEqual(client.ipAddress);
    });

    it('#2 should throw error if the client is not found', async () => {
      await expect(() =>
        clientsService.getClientByIpAddress(client.ipAddress)
      ).rejects.toThrowError(
        new VotatoonNotFoundException({
          error: EErrorCode.CLIENT_NOT_FOUND,
          message: 'No client object found'
        })
      );
    });

    it('#3 should throw error if there is an unexpected error', async () => {
      await expect(() =>
        clientsService.getClientByIpAddress(client.ipAddress)
      ).rejects.toThrowError(
        new VotatoonInternalServerErrorException({
          error: EErrorCode.INTERNAL_SERVER_ERROR,
          message: 'Error retrieving client information'
        })
      );
    });
  });
});
