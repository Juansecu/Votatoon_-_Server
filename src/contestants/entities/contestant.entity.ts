import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('contestants')
export class ContestantEntity {
  @PrimaryColumn({
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
    length: 125,
    name: 'Small_image_path',
    nullable: false,
    unique: true
  })
  smallImagePath: string;
  @Column('varchar', {
    length: 125,
    name: 'Large_image_path',
    nullable: false,
    unique: true
  })
  largeImagePath: string;
  @CreateDateColumn({
    name: 'Added_at'
  })
  addedAt: Date;
  @UpdateDateColumn({
    name: 'Updated_at'
  })
  updatedAt: Date;
}
