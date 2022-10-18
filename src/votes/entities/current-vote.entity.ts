import { Connection, ViewColumn, ViewEntity } from 'typeorm';

import { EContestantType } from '../../contestants/enums/Contestant';

import { ClientVoteEntity } from './client-vote.entity';
import { VoteTotalEntity } from './vote-total.entity';
import { ClientEntity } from '../../clients/entities/client.entity';
import { ContestantEntity } from '../../contestants/entities/contestant.entity';
import { RaceEntity } from '../../races/entities/race.entity';

@ViewEntity('v_current_votes', {
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select('r.Race_id', 'Race_id')
      .addSelect('r.Active', 'Active')
      .addSelect('con.Contestant_id', 'Contestant_id')
      .addSelect('con.Name', 'Name')
      .addSelect('v.Contestant_type', 'Contestant_type')
      .addSelect('con.Large_image_path', 'Large_image_path')
      .addSelect('con.Small_image_path', 'Small_image_path')
      .addSelect('cli.Client_id', 'Client_id')
      .addSelect('cli.Ip_address', 'Ip_address')
      .addFrom(ClientVoteEntity, 'clv')
      .innerJoin(ClientEntity, 'cli')
      .innerJoin(ContestantEntity, 'con')
      .innerJoin(RaceEntity, 'r')
      .innerJoin(VoteTotalEntity, 'v')
})
export class CurrentVoteEntity {
  @ViewColumn({ name: 'Race_id' })
  raceId: number;
  @ViewColumn({ name: 'Active' })
  active: number;
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
