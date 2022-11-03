import { Connection, ViewColumn, ViewEntity } from 'typeorm';

import { EContestantType } from '../../contestants/enums/contestant-type.enum';

import { ClientVoteEntity } from './client-vote.entity';
import { ContestantEntity } from '../../contestants/entities/contestant.entity';
import { RaceEntity } from '../../races/entities/race.entity';
import { RaceContestantEntity } from '../../races/entities/race-contestant.entity';

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
      .addSelect('r.Is_active', 'Is_active')
      .addSelect('COUNT(cv.Race_contestant_id)', 'Vote_total_value')
      .addFrom(RaceContestantEntity, 'rc')
      .innerJoin(ContestantEntity, 'c', 'rc.Contestant_id = c.Contestant_id')
      .innerJoin(RaceEntity, 'r', 'rc.Race_id = r.Race_id')
      .leftJoin(
        ClientVoteEntity,
        'cv',
        'rc.Race_contestant_id = cv.Race_contestant_id'
      )
      .groupBy('rc.Race_contestant_id')
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
  @ViewColumn({ name: 'Is_active' })
  isActive: number;
  @ViewColumn({ name: 'Vote_total_value' })
  voteTotalValue: number;
}
