import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Contestants')
export class ContestantEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'Contestant_id',
    unsigned: true
  })
  contestantId: number;
  @Column('varchar', {
    length: 45,
    name: 'Name',
    nullable: false,
    unique: true
  })
  name: string;
  @Column('varchar', {
    name: 'Small_image_path',
    nullable: false,
    unique: true
  })
  smallImagePath: string;
  @Column('varchar', {
    name: 'Large_image_path',
    nullable: false,
    unique: true
  })
  largeImagePath: string;
  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
    name: 'Added_at',
    nullable: true
  })
  addedAt: Date;
  @Column('datetime', { name: 'Updated_at', nullable: true }) updatedAt: Date;
}
