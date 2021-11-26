import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';

import { AppService } from './app.service';
import { RacesModule } from './races/races.module';
import { ContestantsModule } from './contestants/contestants.module';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
      host: process.env.DATABASE_HOST,
      password: process.env.DATABASE_PASSWORD,
      port: parseInt(process.env.DATABASE_PORT),
      type: 'mysql',
      username: process.env.DATABASE_USERNAME
    }),
    ContestantsModule,
    RacesModule,
    VotesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
