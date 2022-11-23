import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { request } from 'express';

import { IRequestClientData } from '../../clients/typings/Request';
import { ISuccessResponseMessage } from '../../shared/typings/ResponseMessage';

import { EContestantType } from '../../contestants/enums/contestant-type.enum';
import { EErrorCode } from '../../core/enums/error-code.enum';

import { VotatoonConflictException } from '../../core/exceptions/votatoon-conflict.exception';
import { VotatoonNotFoundException } from '../../core/exceptions/votatoon-not-found.exception';

import { ClientVoteEntity } from '../entities/client-vote.entity';
import { ContestantVoteEntity } from '../entities/contestant-vote.entity';
import { VoteEntity } from '../entities/vote.entity';
import { ClientEntity } from '../../clients/entities/client.entity';

import { contestantVotes } from '../mocks/contestant-votes.mock';
import { clientVotesRepository } from '../mocks/factories/client-votes-repository.mock-factory';
import { contestantVotesRepository } from '../mocks/factories/contestant-votes-repository.mock-factory';
import { votesRepository } from '../mocks/factories/votes-repository.mock-factory';

import { VotesService } from './votes.service';
import { ConsoleLoggerService } from '../../loggers/services/console-logger/console-logger.service';

import { setValue } from '../../shared/utils/functions/set-value/set-value.function';

describe('VotesService', () => {
  let votesService: VotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsoleLoggerService,
        VotesService,
        {
          provide: getRepositoryToken(ClientVoteEntity),
          useFactory: clientVotesRepository
        },
        {
          provide: getRepositoryToken(ContestantVoteEntity),
          useFactory: contestantVotesRepository
        },
        {
          provide: getRepositoryToken(VoteEntity),
          useFactory: votesRepository
        }
      ]
    }).compile();

    votesService = module.get<VotesService>(VotesService);
  });

  it('votesService should be defined', () => {
    expect(votesService).toBeDefined();
  });

  describe('checkRaceContestantVotesRecords', () => {
    it('#1 should throw an error when the amount of records is not 2', () => {
      const raceInformationRecords: [
        ContestantVoteEntity,
        ContestantVoteEntity
      ] = [
        new ContestantVoteEntity(),
        new ContestantVoteEntity(),
        new ContestantVoteEntity()
      ] as unknown as [ContestantVoteEntity, ContestantVoteEntity];

      expect(() =>
        votesService.checkRaceContestantVotesRecords(raceInformationRecords, 1)
      ).toThrowError(
        new VotatoonNotFoundException({
          error: EErrorCode.NO_RECORDS_AMOUNT_ENOUGH,
          message: 'Not necessary amount of votesTotal was found'
        })
      );
    });

    it('#2 should throw an error when both records do not belong to the given race ID', () => {
      const raceInformationRecords: [
        ContestantVoteEntity,
        ContestantVoteEntity
      ] = [
        new ContestantVoteEntity(),
        new ContestantVoteEntity()
      ] as unknown as [ContestantVoteEntity, ContestantVoteEntity];

      raceInformationRecords[0].raceId = 1;
      raceInformationRecords[1].raceId = 2;

      expect(() =>
        votesService.checkRaceContestantVotesRecords(raceInformationRecords, 1)
      ).toThrowError(
        new VotatoonNotFoundException({
          error: EErrorCode.NO_RECORDS_AMOUNT_ENOUGH,
          message: 'Not necessary amount of votesTotal was found'
        })
      );
    });

    it('#3 should throw an error when the first record is not for the contestant A', () => {
      const raceInformationRecords: [
        ContestantVoteEntity,
        ContestantVoteEntity
      ] = [
        new ContestantVoteEntity(),
        new ContestantVoteEntity()
      ] as unknown as [ContestantVoteEntity, ContestantVoteEntity];

      raceInformationRecords[0].raceId = 1;
      raceInformationRecords[1].raceId = 1;

      raceInformationRecords[0].contestantType = EContestantType.B;
      raceInformationRecords[1].contestantType = EContestantType.A;

      expect(() =>
        votesService.checkRaceContestantVotesRecords(raceInformationRecords, 1)
      ).toThrowError(
        new VotatoonNotFoundException({
          error: EErrorCode.NO_RECORDS_AMOUNT_ENOUGH,
          message: 'Not necessary amount of votesTotal was found'
        })
      );
    });

    it('#4 should throw an error when the second record is not for the contestant B', () => {
      const raceInformationRecords: [
        ContestantVoteEntity,
        ContestantVoteEntity
      ] = [
        new ContestantVoteEntity(),
        new ContestantVoteEntity()
      ] as unknown as [ContestantVoteEntity, ContestantVoteEntity];

      raceInformationRecords[0].raceId = 1;
      raceInformationRecords[1].raceId = 1;

      raceInformationRecords[0].contestantType = EContestantType.A;
      raceInformationRecords[1].contestantType = EContestantType.A;

      expect(() =>
        votesService.checkRaceContestantVotesRecords(raceInformationRecords, 1)
      ).toThrowError(
        new VotatoonNotFoundException({
          error: EErrorCode.NO_RECORDS_AMOUNT_ENOUGH,
          message: 'Not necessary amount of votesTotal was found'
        })
      );
    });
  });

  describe('getContestantVotes', () => {
    const isActive = 1;

    beforeAll(() => {
      const contestantVote1: ContestantVoteEntity = new ContestantVoteEntity();
      const contestantVote2: ContestantVoteEntity = new ContestantVoteEntity();

      contestantVote1.contestantType = EContestantType.A;
      contestantVote1.raceId = 1;

      contestantVote2.contestantType = EContestantType.B;
      contestantVote2.raceId = 1;

      contestantVotesRepository.mockImplementationOnce(() => ({
        find: () =>
          Promise.resolve(
            contestantVotes.filter(
              (contestantVote: ContestantVoteEntity) =>
                contestantVote.isActive === isActive
            )
          )
      }));
    });

    it('#1 should return the contestants for the current active race', async () => {
      const result: [ContestantVoteEntity, ContestantVoteEntity] =
        (await votesService.getContestantVotes({
          isActive
        })) as [ContestantVoteEntity, ContestantVoteEntity];

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Array);
      expect(
        result.every(
          (contestantVote: ContestantVoteEntity) =>
            contestantVote.isActive === 1
        )
      ).toBe(true);
      expect(result[0].contestantType).toBe(EContestantType.A);
      expect(result[1].contestantType).toBe(EContestantType.B);
    });
  });

  describe('vote', () => {
    const vote: VoteEntity = new VoteEntity();

    beforeAll(() => {
      const client: ClientEntity = new ClientEntity();
      const contestantVote: ContestantVoteEntity = new ContestantVoteEntity();

      client.addedAt = new Date();
      client.clientId = 1;
      client.ipAddress = '127.0.0.1';
      client.updatedAt = new Date();

      contestantVote.contestantType = EContestantType.A;
      contestantVote.raceId = 1;

      vote.clientId = 1;
      vote.contestantId = 1;
      vote.contestantType = EContestantType.A;
      vote.ipAddress = '127.0.0.1';
      vote.isActive = 1;
      vote.largeImagePath = 'largeImagePath';
      vote.name = 'name';
      vote.raceContestantId = 1;
      vote.raceId = 1;
      vote.smallImagePath = 'smallImagePath';

      setValue(request, 'data.client', client);

      contestantVotesRepository.mockImplementationOnce(() => ({
        findOne: () => Promise.resolve(contestantVote)
      }));

      votesRepository.mockImplementationOnce(() => ({
        findOne: () => Promise.resolve(null)
      }));
    });

    it('#1 should return a successful response', async () => {
      const result: ISuccessResponseMessage = await votesService.vote(
        EContestantType.A,
        request as IRequestClientData
      );

      expect(result).toBeDefined();
      expect(result).toMatchObject<ISuccessResponseMessage>({
        message: 'Vote saved',
        success: true
      });
    });

    it('#2 should throw an error when the contestant vote record is found', async () => {
      votesRepository.mockImplementationOnce(() => ({
        findOne: () => Promise.resolve(vote)
      }));

      await expect(() =>
        votesService.vote(EContestantType.A, request as IRequestClientData)
      ).rejects.toThrowError(
        new VotatoonConflictException({
          error: EErrorCode.EXISTING_VOTE,
          message: 'There is already a current vote for this client'
        })
      );
    });
  });
});
