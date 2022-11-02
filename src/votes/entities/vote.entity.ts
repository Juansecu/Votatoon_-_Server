import { Connection, ViewColumn, ViewEntity } from 'typeorm';

import { EContestantType } from '../../contestants/enums/contestant-type.enum';

import { ClientVoteEntity } from './client-vote.entity';
import { ClientEntity } from '../../clients/entities/client.entity';
import { ContestantEntity } from '../../contestants/entities/contestant.entity';
import { RaceEntity } from '../../races/entities/race.entity';
import { RaceContestantEntity } from '../../races/entities/race-contestant.entity';

@ViewEntity('v_votes', {
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select('r.Race_id', 'Race_id')
      .addSelect('r.Is_active', 'Is_active')
      .addSelect('rc.Race_contestant_id', 'Race_contestant_id')
      .addSelect('con.Contestant_id', 'Contestant_id')
      .addSelect('con.Name', 'Name')
      .addSelect('rc.Contestant_type', 'Contestant_type')
      .addSelect('con.Large_image_path', 'Large_image_path')
      .addSelect('con.Small_image_path', 'Small_image_path')
      .addSelect('cli.Client_id', 'Client_id')
      .addSelect('cli.Ip_address', 'Ip_address')
      .addFrom(ClientVoteEntity, 'cv')
      .innerJoin(ClientEntity, 'cli')
      .innerJoin(ContestantEntity, 'con')
      .innerJoin(RaceEntity, 'r')
      .innerJoin(RaceContestantEntity, 'rc')
})
export class VoteEntity {
  @ViewColumn({ name: 'Race_id' })
  raceId: number;
  @ViewColumn({ name: 'Is_active' })
  isActive: number;
  @ViewColumn({ name: 'Race_contestant_id' })
  raceContestantId: number;
  @ViewColumn({ name: 'Contestant_id' })
  contestantId: number;
  @ViewColumn({ name: 'Name' })
  name: string;
  @ViewColumn({ name: 'Contestant_type' })
  contestantType: EContestantType;
  @ViewColumn({ name: 'Large_image_path' })
  largeImagePath: string;
  @ViewColumn({ name: 'Small_image_path' })
  smallImagePath: string;
  @ViewColumn({ name: 'Client_id' })
  clientId: number;
  @ViewColumn({ name: 'Ip_address' })
  ipAddress: string;
}
