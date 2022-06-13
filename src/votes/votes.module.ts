import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggersModule } from '../loggers/loggers.module';
import { RacesModule } from '../races/races.module';

import { VoteTotalEntity } from './entities/vote-total.entity';

import { VotesController } from './votes.controller';

import { VotesService } from './services/votes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([VoteTotalEntity]),
    LoggersModule,
    forwardRef(() => RacesModule)
  ],
  controllers: [VotesController],
  providers: [VotesService],
  exports: [VotesService]
})
export class VotesModule {}
