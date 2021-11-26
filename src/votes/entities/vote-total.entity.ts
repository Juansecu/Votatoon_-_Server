import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { EContestantType } from 'src/contestants/enums/Contestant';

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
  @Column('int', { name: 'Contestant_id', nullable: false, unsigned: true })
  contestantId: number;
  @Column('int', { name: 'Race_id', nullable: false, unsigned: true })
  raceId: number;
  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
    name: 'Created_at',
    nullable: true
  })
  createdAt: Date;
  @Column('datetime', { name: 'Updated_at', nullable: true }) updatedAt: Date;
}
