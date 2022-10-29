import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientsModule } from '../clients/clients.module';
import { LoggersModule } from '../loggers/loggers.module';
import { SharedModule } from '../shared/shared.module';

import { ClientVoteEntity } from './entities/client-vote.entity';
import { ContestantVoteEntity } from './entities/contestant-vote.entity';
import { VoteEntity } from './entities/vote.entity';

import { ClientDataRetrievingMiddleware } from '../clients/middlewares/client-data-retrieving.middleware';
import { CryptographicCredentialsValidationMiddleware } from '../shared/middlewares/cryptographic-credentials-validation.middleware';

import { VotesController } from './votes.controller';

import { VotesService } from './services/votes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClientVoteEntity,
      ContestantVoteEntity,
      VoteEntity
    ]),
    ClientsModule,
    LoggersModule,
    SharedModule
  ],
  controllers: [VotesController],
  providers: [VotesService],
  exports: [VotesService]
})
export class VotesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        CryptographicCredentialsValidationMiddleware,
        ClientDataRetrievingMiddleware
      )
      .forRoutes('votes/vote/a|b');
  }
}
