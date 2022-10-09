import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggersModule } from '../loggers/loggers.module';

import { RaceEntity } from './entities/race.entity';
import { RaceInformationEntity } from './entities/race-information.entity';

import { RacesController } from './races.controller';

import { RacesService } from './services/races.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RaceEntity, RaceInformationEntity]),
    LoggersModule
  ],
  controllers: [RacesController],
  providers: [RacesService],
  exports: [RacesService]
})
export class RacesModule {}
