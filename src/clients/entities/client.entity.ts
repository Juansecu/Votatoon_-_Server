import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('clients')
export class ClientEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'Client_id',
    unsigned: true
  })
  clientId: number;
  @Column('varchar', {
    length: 64,
    name: 'Ip_address',
    nullable: false,
    unique: true
  })
  ipAddress: string;
  @CreateDateColumn({
    name: 'Added_at'
  })
  addedAt: Date;
  @UpdateDateColumn({
    name: 'Updated_at'
  })
  updatedAt: Date;
}
