import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggersModule } from '../loggers/loggers.module';

import { ContestantEntity } from './entities/contestant.entity';

import { ContestantsService } from './services/contestants.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContestantEntity]), LoggersModule],
  providers: [ContestantsService],
  exports: [ContestantsService]
})
export class ContestantsModule {}
