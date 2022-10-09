import { Connection, ViewColumn, ViewEntity } from 'typeorm';

import { EContestantType } from '../../contestants/enums/Contestant';

import { RaceEntity } from './race.entity';
import { ContestantEntity } from '../../contestants/entities/contestant.entity';
import { VoteTotalEntity } from '../../votes/entities/vote-total.entity';

@ViewEntity('v_races_information', {
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select('c.Name', 'Name')
      .addSelect('c.Small_image_path', 'Small_image_path')
      .addSelect('c.Large_image_path', 'Large_image_path')
      .addSelect('r.Race_id', 'Race_id')
      .addSelect('r.Active', 'Active')
      .addSelect('v.Vote_total_value', 'Vote_total_value')
      .addSelect('v.Contestant_type', 'Contestant_type')
      .addFrom(VoteTotalEntity, 'v')
      .innerJoin(ContestantEntity, 'c', 'c.Contestant_id = v.Contestant_id')
      .innerJoin(RaceEntity, 'r', 'r.Race_id = v.Race_id')
})
export class RaceInformationEntity {
  @ViewColumn({ name: 'Name' })
  name: string;
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
  @ViewColumn({ name: 'Contestant_type' })
  contestantType: EContestantType;
}
