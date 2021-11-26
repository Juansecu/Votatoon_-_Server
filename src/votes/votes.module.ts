import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VoteTotalEntity } from './entities/vote-total.entity';

import { VotesService } from './services/votes.service';

@Module({
  imports: [TypeOrmModule.forFeature([VoteTotalEntity])],
  providers: [VotesService],
  exports: [VotesService]
})
export class VotesModule {}
