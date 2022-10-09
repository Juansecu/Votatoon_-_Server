import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggersModule } from '../loggers/loggers.module';

import { ContestantEntity } from './entities/contestant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContestantEntity]), LoggersModule]
})
export class ContestantsModule {}
