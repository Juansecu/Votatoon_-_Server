import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RacesModule } from 'src/races/races.module';

import { VoteTotalEntity } from './entities/vote-total.entity';

import { VotesController } from './votes.controller';

import { VotesService } from './services/votes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([VoteTotalEntity]),
    forwardRef(() => RacesModule)
  ],
  controllers: [VotesController],
  providers: [VotesService],
  exports: [VotesService]
})
export class VotesModule {}
