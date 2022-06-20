import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { EContestantType } from '../../contestants/enums/Contestant';

import { RaceEntity } from '../../races/entities/race.entity';
import { ContestantEntity } from '../../contestants/entities/contestant.entity';

@Entity('Votes_total')
export class VoteTotalEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'Vote_total_id',
    unsigned: true
  })
  voteTotalId: number;
  @Column('int', {
    name: 'Vote_total_value',
    nullable: false,
    unsigned: true
  })
  voteTotalValue: number;
  @Column('enum', {
    enum: EContestantType,
    name: 'Contestant_type',
    nullable: false
  })
  contestantType: EContestantType;
  @JoinColumn({
    name: 'Contestant_id',
    referencedColumnName: 'contestantId'
  })
  @OneToMany(
    () => ContestantEntity,
    (contestant: ContestantEntity) => contestant.contestantId,
    {
      nullable: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  )
  contestantId: number;
  @JoinColumn({
    name: 'Race_id',
    referencedColumnName: 'raceId'
  })
  @OneToMany(() => RaceEntity, (race: RaceEntity) => race.raceId, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  raceId: number;
  @CreateDateColumn({
    name: 'Created_at'
  })
  createdAt: Date;
  @UpdateDateColumn({
    name: 'Updated_at'
  })
  updatedAt: Date;
}
