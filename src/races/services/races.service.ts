import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IErrorResponseMessage } from '../../shared/typings/ErrorResponseMessage';

import { RaceDto } from '../dtos/Race.dto';

import { RaceEntity } from '../entities/race.entity';
import { ContestantEntity } from '../../contestants/entities/contestant.entity';
import { VoteTotalEntity } from '../../votes/entities/vote-total.entity';

import { ContestantsService } from '../../contestants/services/contestants.service';
import { VotesService } from '../../votes/services/votes.service';

@Injectable()
export class RacesService {
  constructor(
    private readonly _CONTESTANTS_SERVICE: ContestantsService,
    @InjectRepository(RaceEntity)
    private readonly _RACES_REPOSITORY: Repository<RaceEntity>,
    @Inject(forwardRef(() => VotesService))
    private readonly _VOTES_SERVICE: VotesService
  ) {}

  async getCurrentRace(): Promise<RaceDto | IErrorResponseMessage> {
    try {
      const race: RaceEntity = await this._RACES_REPOSITORY.findOne({
        where: { active: parseInt('1') }
      });

      if (race) {
        const votesTotal: VoteTotalEntity[] | IErrorResponseMessage =
          await this._VOTES_SERVICE.getVotesTotalByRaceId(race.raceId);

        if (votesTotal instanceof Array && votesTotal.length === 2) {
          let contestants: ContestantEntity[] = [];
          let raceDto: RaceDto = null;

          const contestantIds: number[] = [];

          votesTotal.map((voteTotalEntity: VoteTotalEntity) =>
            contestantIds.push(voteTotalEntity.contestantId)
          );

          contestants = await this._CONTESTANTS_SERVICE.getContestantsById(
            contestantIds
          );

          raceDto = new RaceDto(
            race.raceId,
            0,
            contestants[0].name,
            contestants[1].name,
            Math.round(
              (votesTotal[0].voteTotalValue /
                (votesTotal[0].voteTotalValue + votesTotal[1].voteTotalValue)) *
                100
            ),
            Math.round(
              (votesTotal[1].voteTotalValue /
                (votesTotal[0].voteTotalValue + votesTotal[1].voteTotalValue)) *
                100
            ),
            votesTotal[0].voteTotalValue,
            votesTotal[1].voteTotalValue,
            contestants[0].smallImagePath,
            contestants[1].smallImagePath,
            contestants[0].largeImagePath,
            contestants[1].largeImagePath,
            race.active ? true : false
          );

          return raceDto;
        }

        throw new NotFoundException({
          error: 'NoAmountEnough',
          message: 'Not necessary amount of votesTotal was found'
        });
      }

      throw new NotFoundException({
        error: 'NoActiveRace',
        message: 'No active-race was found'
      });
    } catch (error) {
      throw new InternalServerErrorException({
        error: error.name,
        message: error.message
      });
    }
  }

  async getRaceList(): Promise<RaceDto[] | IErrorResponseMessage> {
    try {
      const races: RaceEntity[] = await this._RACES_REPOSITORY.find();
      const raceList: RaceDto[] = [];

      await Promise.all(
        races.map(async (raceEntity: RaceEntity) => {
          const votesTotal: VoteTotalEntity[] | IErrorResponseMessage =
            await this._VOTES_SERVICE.getVotesTotalByRaceId(raceEntity.raceId);

          if (votesTotal instanceof Array && votesTotal.length === 2) {
            let contestants: ContestantEntity[] = [];

            const contestantIds: number[] = [];

            votesTotal.forEach((voteTotalEntity: VoteTotalEntity) =>
              contestantIds.push(voteTotalEntity.contestantId)
            );

            contestants = await this._CONTESTANTS_SERVICE.getContestantsById(
              contestantIds
            );

            raceList.push({
              id: raceEntity.raceId,
              index: raceList.length,
              toonA: contestants[0].name,
              toonB: contestants[1].name,
              aVotesPercent: Math.round(
                (votesTotal[0].voteTotalValue /
                  (votesTotal[0].voteTotalValue +
                    votesTotal[1].voteTotalValue)) *
                  100
              ),
              bVotesPercent: Math.round(
                (votesTotal[1].voteTotalValue /
                  (votesTotal[0].voteTotalValue +
                    votesTotal[1].voteTotalValue)) *
                  100
              ),
              aVotesTotal: votesTotal[0].voteTotalValue,
              bVotesTotal: votesTotal[1].voteTotalValue,
              aSmallImagePath: contestants[0].smallImagePath,
              bSmallImagePath: contestants[1].smallImagePath,
              aLargeImagePath: contestants[0].largeImagePath,
              bLargeImagePath: contestants[1].largeImagePath,
              active: raceEntity.active ? true : false
            });
          }
        })
      );

      return raceList;
    } catch (error) {
      throw new InternalServerErrorException({
        error: error.name,
        message: error.message
      });
    }
  }
}
