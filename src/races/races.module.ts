import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContestantsModule } from '../contestants/contestants.module';
import { VotesModule } from '../votes/votes.module';

import { RaceEntity } from './entities/race.entity';

import { RacesController } from './races.controller';

import { RacesService } from './services/races.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RaceEntity]),
    ContestantsModule,
    VotesModule
  ],
  controllers: [RacesController],
  providers: [RacesService],
  exports: [RacesService]
})
export class RacesModule {}
