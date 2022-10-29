import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { EContestantType } from '../../contestants/enums/Contestant';

import { RaceEntity } from './race.entity';
import { ContestantEntity } from '../../contestants/entities/contestant.entity';

@Entity('race_contestants')
export class RaceContestantEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'Race_contestant_id',
    unsigned: true
  })
  raceContestantId: number;
  @Column('enum', {
    enum: EContestantType,
    name: 'Contestant_type',
    nullable: false
  })
  contestantType: EContestantType;
  @JoinColumn({
    name: 'Race_id',
    referencedColumnName: 'raceId'
  })
  @ManyToOne(() => RaceEntity, (race: RaceEntity) => race.raceId, {
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
  @CreateDateColumn({
    name: 'Added_at'
  })
  addedAt: Date;
  @UpdateDateColumn({
    name: 'Updated_at'
  })
  updatedAt: Date;
}
