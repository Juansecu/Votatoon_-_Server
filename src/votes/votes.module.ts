import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientsModule } from '../clients/clients.module';
import { LoggersModule } from '../loggers/loggers.module';
import { RacesModule } from '../races/races.module';
import { SharedModule } from '../shared/shared.module';

import { ClientVoteEntity } from './entities/client-vote.entity';
import { CurrentVoteEntity } from './entities/current-vote.entity';
import { VoteTotalEntity } from './entities/vote-total.entity';

import { VotesController } from './votes.controller';

import { VotesService } from './services/votes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClientVoteEntity,
      CurrentVoteEntity,
      VoteTotalEntity
    ]),
    ClientsModule,
    LoggersModule,
    RacesModule,
    SharedModule
  ],
  controllers: [VotesController],
  providers: [VotesService],
  exports: [VotesService]
})
export class VotesModule {}
