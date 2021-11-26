import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Races')
export class RaceEntity {
  @PrimaryGeneratedColumn('increment', { name: 'Race_id', unsigned: true })
  raceId: number;
  @Column('tinyint', { name: 'Active', nullable: false, unsigned: true })
  active: boolean;
  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
    name: 'Created_at',
    nullable: true
  })
  createdAt: Date;
  @Column('datetime', { name: 'Updated_at', nullable: true }) updateAt: Date;
}
