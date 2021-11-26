import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContestantEntity } from './entities/contestant.entity';

import { ContestantsService } from './services/contestants.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContestantEntity])],
  providers: [ContestantsService],
  exports: [ContestantsService]
})
export class ContestantsModule {}
