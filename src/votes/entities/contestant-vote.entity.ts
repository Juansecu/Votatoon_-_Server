import { Connection, ViewColumn, ViewEntity } from 'typeorm';

import { EContestantType } from '../../contestants/enums/Contestant';

import { RaceEntity } from '../../races/entities/race.entity';
import { RaceContestantEntity } from '../../races/entities/race-contestant.entity';
import { ContestantEntity } from '../../contestants/entities/contestant.entity';
import { ClientVoteEntity } from './client-vote.entity';

@ViewEntity('v_contestant_votes', {
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select('rc.Race_contestant_id', 'Race_contestant_id')
      .addSelect('c.Contestant_id', 'Contestant_id')
      .addSelect('c.Name', 'Name')
      .addSelect('rc.Contestant_type', 'Contestant_type')
      .addSelect('c.Small_image_path', 'Small_image_path')
      .addSelect('c.Large_image_path', 'Large_image_path')
      .addSelect('r.Race_id', 'Race_id')
      .addSelect('r.Active', 'Active')
      .addSelect('COUNT(cv.Race_contestant_id)', 'Vote_total_value')
      .addFrom(ClientVoteEntity, 'cv')
      .innerJoin(ContestantEntity, 'c', 'cv.Contestant_id = c.Contestant_id')
      .innerJoin(RaceEntity, 'r', 'cv.Race_id = r.Race_id')
      .innerJoin(
        RaceContestantEntity,
        'rc',
        'cv.Race_contestant_id = rc.Race_contestant_id'
      )
      .groupBy('cv.Race_contestant_id')
})
export class ContestantVoteEntity {
  @ViewColumn({ name: 'Race_contestant_id' })
  raceContestantId: number;
  @ViewColumn({ name: 'Contestant_id' })
  contestantId: number;
  @ViewColumn({ name: 'Name' })
  name: string;
  @ViewColumn({ name: 'Contestant_type' })
  contestantType: EContestantType;
  @ViewColumn({ name: 'Small_image_path' })
  smallImagePath: string;
  @ViewColumn({ name: 'Large_image_path' })
  largeImagePath: string;
  @ViewColumn({ name: 'Race_id' })
  raceId: number;
  @ViewColumn({ name: 'Active' })
  active: boolean;
  @ViewColumn({ name: 'Vote_total_value' })
  voteTotalValue: number;
}
