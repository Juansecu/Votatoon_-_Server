import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { EErrorCode } from '../../core/enums/error-code.enum';

import { VotatoonNotFoundException } from '../../core/exceptions/votatoon-not-found.exception';

import { ClientVoteEntity } from '../../votes/entities/client-vote.entity';
import { ContestantVoteEntity } from '../../votes/entities/contestant-vote.entity';
import { VoteEntity } from '../../votes/entities/vote.entity';

import { contestantVotes } from '../../votes/mocks/contestant-votes.mock';
import { clientVotesRepository } from '../../votes/mocks/factories/client-votes-repository.mock-factory';
import { contestantVotesRepository } from '../../votes/mocks/factories/contestant-votes-repository.mock-factory';
import { votesRepository } from '../../votes/mocks/factories/votes-repository.mock-factory';

import { RaceResDto } from '../dtos/response/race.res.dto';

import { RacesService } from './races.service';
import { ConsoleLoggerService } from '../../loggers/services/console-logger/console-logger.service';
import { VotesService } from '../../votes/services/votes.service';

describe('RacesService', () => {
  let racesService: RacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsoleLoggerService,
        RacesService,
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

    racesService = module.get<RacesService>(RacesService);
  });

  it('racesService should be defined', () => {
    expect(racesService).toBeDefined();
  });

  describe('createRaceInformationResponse', () => {
    it('#1 should create a race information response', () => {
      const raceInformationResponse: RaceResDto =
        racesService.createRaceInformationResponse(
          contestantVotes.slice(contestantVotes.length - 2) as [
            ContestantVoteEntity,
            ContestantVoteEntity
          ]
        );

      expect(raceInformationResponse).toBeDefined();
      expect(raceInformationResponse).toMatchObject<RaceResDto>({
        id: 4,
        index: 0,
        toonA: 'Contestant 7',
        toonB: 'Contestant 8',
        aVotesPercent: NaN,
        bVotesPercent: NaN,
        aVotesTotal: 0,
        bVotesTotal: 0,
        aSmallImagePath: 'contestant7-small-image-path',
        bSmallImagePath: 'contestant8-small-image-path',
        aLargeImagePath: 'contestant7-large-image-path',
        bLargeImagePath: 'contestant8-large-image-path',
        active: false
      });
    });
  });

  describe('getCurrentRace', () => {
    beforeAll(() => {
      contestantVotesRepository.mockImplementationOnce(() => ({
        find: () =>
          Promise.resolve(
            contestantVotes.filter(
              (contestantVote: ContestantVoteEntity) =>
                contestantVote.isActive === 1
            )
          )
      }));
    });

    it('#1 should return the current race information', async () => {
      const currentRaceInformation: RaceResDto =
        await racesService.getCurrentRace();

      expect(currentRaceInformation).toBeDefined();
      expect(currentRaceInformation).toMatchObject<RaceResDto>({
        id: 3,
        index: 0,
        toonA: 'Contestant 5',
        toonB: 'Contestant 6',
        aVotesPercent: 45,
        bVotesPercent: 55,
        aVotesTotal: 50,
        bVotesTotal: 60,
        aSmallImagePath: 'contestant5-small-image-path',
        bSmallImagePath: 'contestant6-small-image-path',
        aLargeImagePath: 'contestant5-large-image-path',
        bLargeImagePath: 'contestant6-large-image-path',
        active: true
      });
    });

    it('#2 should throw an error if there is no a current active race', async () => {
      expect(() => racesService.getCurrentRace()).rejects.toThrowError(
        new VotatoonNotFoundException({
          error: EErrorCode.NO_ACTIVE_RACE,
          message: 'No active race was found'
        })
      );
    });
  });

  describe('getRaceList', () => {
    beforeAll(() => {
      contestantVotesRepository.mockImplementationOnce(() => ({
        find: () =>
          Promise.resolve(contestantVotes.slice(contestantVotes.length - 4))
      }));
    });

    it('#1 should return the information of the last two races', async () => {
      const raceList: RaceResDto[] = await racesService.getRaceList();

      expect(raceList).toBeDefined();
      expect(raceList).toBeInstanceOf(Array);
      expect(raceList).toHaveLength(2);
      expect(raceList).toMatchObject<RaceResDto[]>([
        {
          id: 3,
          index: 0,
          toonA: 'Contestant 5',
          toonB: 'Contestant 6',
          aVotesPercent: 45,
          bVotesPercent: 55,
          aVotesTotal: 50,
          bVotesTotal: 60,
          aSmallImagePath: 'contestant5-small-image-path',
          bSmallImagePath: 'contestant6-small-image-path',
          aLargeImagePath: 'contestant5-large-image-path',
          bLargeImagePath: 'contestant6-large-image-path',
          active: true
        },
        {
          id: 4,
          index: 1,
          toonA: 'Contestant 7',
          toonB: 'Contestant 8',
          aVotesPercent: NaN,
          bVotesPercent: NaN,
          aVotesTotal: 0,
          bVotesTotal: 0,
          aSmallImagePath: 'contestant7-small-image-path',
          bSmallImagePath: 'contestant8-small-image-path',
          aLargeImagePath: 'contestant7-large-image-path',
          bLargeImagePath: 'contestant8-large-image-path',
          active: false
        }
      ]);
    });
  });
});
