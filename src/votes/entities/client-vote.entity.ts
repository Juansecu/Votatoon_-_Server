import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { ClientEntity } from '../../clients/entities/client.entity';
import { ContestantEntity } from '../../contestants/entities/contestant.entity';
import { RaceEntity } from '../../races/entities/race.entity';
import { RaceContestantEntity } from '../../races/entities/race-contestant.entity';

@Entity('client_votes')
export class ClientVoteEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'Client_vote_id',
    unsigned: true
  })
  clientVoteId: number;
  @JoinColumn({
    name: 'Race_id',
    referencedColumnName: 'raceId'
  })
  @ManyToOne(() => RaceEntity, race => race.raceId, {
    cascade: true,
    nullable: false
  })
  raceId: number;
  @JoinColumn({
    name: 'Contestant_id',
    referencedColumnName: 'contestantId'
  })
  @ManyToOne(
    () => ContestantEntity,
    (contestant: ContestantEntity) => contestant.contestantId,
    {
      cascade: true,
      nullable: false
    }
  )
  contestantId: number;
  @JoinColumn({
    name: 'Race_contestant_id',
    referencedColumnName: 'raceContestantId'
  })
  @ManyToOne(
    () => RaceContestantEntity,
    (raceContestant: RaceContestantEntity) => raceContestant.raceContestantId,
    {
      cascade: true,
      nullable: false
    }
  )
  raceContestantId: number;
  @JoinColumn({
    name: 'Client_id',
    referencedColumnName: 'clientId'
  })
  @ManyToOne(() => ClientEntity, (client: ClientEntity) => client.clientId, {
    cascade: true,
    nullable: false
  })
  clientId: number;
  @CreateDateColumn({
    name: 'Added_at'
  })
  addedAt: Date;
  @UpdateDateColumn({
    name: 'Updated_at'
  })
  updatedAt: Date;
}
