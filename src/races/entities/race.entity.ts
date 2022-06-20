import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('Races')
export class RaceEntity {
  @PrimaryGeneratedColumn('increment', { name: 'Race_id', unsigned: true })
  raceId: number;
  @Column('tinyint', { name: 'Active', nullable: false, unsigned: true })
  active: boolean;
  @CreateDateColumn({
    name: 'Created_at'
  })
  createdAt: Date;
  @UpdateDateColumn({
    name: 'Updated_at'
  })
  updateAt: Date;
}
