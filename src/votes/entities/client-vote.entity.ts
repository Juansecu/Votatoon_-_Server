import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { VoteTotalEntity } from './vote-total.entity';
import { ClientEntity } from '../../clients/entities/client.entity';
import { RaceEntity } from '../../races/entities/race.entity';

@Entity('client_votes')
export class ClientVoteEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'Client_vote_id',
    unsigned: true
  })
  clientVoteId: number;
  @JoinColumn({
    name: 'Race_id'
  })
  @ManyToOne(() => RaceEntity, race => race.raceId, {
    cascade: true,
    nullable: false
  })
  raceId: number;
  @JoinColumn({
    name: 'Vote_total_id'
  })
  @ManyToOne(
    () => VoteTotalEntity,
    (voteTotal: VoteTotalEntity) => voteTotal.voteTotalId,
    {
      cascade: true,
      nullable: false
    }
  )
  voteTotalId: number;
  @JoinColumn({
    name: 'Client_id'
  })
  @ManyToOne(() => ClientEntity, client => client.clientId, {
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
