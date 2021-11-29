import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IRaceResponseMessage } from '../typings/RaceResponseMessage';
import { IErrorResponseMessage } from '../../shared/typings/ErrorResponseMessage';

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
    private readonly _VOTES_SERVICE: VotesService
  ) {}

  async getCurrentRace(): Promise<
    IRaceResponseMessage | IErrorResponseMessage
  > {
    try {
      const race: RaceEntity = await this._RACES_REPOSITORY.findOne({
        where: { active: parseInt('1') }
      });

      if (race) {
        const votesTotal: VoteTotalEntity[] | IErrorResponseMessage =
          await this._VOTES_SERVICE.getVotesTotalByRaceId(race.raceId);

        if (votesTotal instanceof Array && votesTotal.length === 2) {
          let contestants: ContestantEntity[] = [];

          const contestantIds: number[] = [];

          votesTotal.map((voteTotalEntity: VoteTotalEntity) =>
            contestantIds.push(voteTotalEntity.contestantId)
          );

          contestants = await this._CONTESTANTS_SERVICE.getContestantsById(
            contestantIds
          );

          return {
            id: race.raceId,
            index: 0,
            toonA: contestants[0],
            toonB: contestants[1],
            aVotesPercent: Math.round(
              (votesTotal[0].voteTotalValue /
                (votesTotal[0].voteTotalValue + votesTotal[1].voteTotalValue)) *
                100
            ),
            bVotesPercent: Math.round(
              (votesTotal[1].voteTotalValue /
                (votesTotal[0].voteTotalValue + votesTotal[1].voteTotalValue)) *
                100
            ),
            aVotesTotal: votesTotal[0].voteTotalValue,
            bVotesTotal: votesTotal[1].voteTotalValue,
            aSmallImagePath: contestants[0].smallImagePath,
            bSmallImagePath: contestants[1].smallImagePath,
            aLargeImagePath: contestants[0].largeImagePath,
            bLargeImagePath: contestants[1].largeImagePath,
            active: true
          };
        }

        return {
          error: 'NoAmountEnough',
          message: 'Not necessary amount of votesTotal was found'
        };
      }

      return {
        error: 'NoActiveRace',
        message: 'No active-race was found'
      };
    } catch (error) {
      return {
        error: error.name,
        message: error.message
      };
    }
  }

  async getRaceList(): Promise<IRaceResponseMessage[] | IErrorResponseMessage> {
    try {
      const races: RaceEntity[] = await this._RACES_REPOSITORY.find();
      const raceList: IRaceResponseMessage[] = [];

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
              toonA: contestants[0],
              toonB: contestants[1],
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
      return {
        error: error.name,
        message: error.message
      };
    }
  }
}
