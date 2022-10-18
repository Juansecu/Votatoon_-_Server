import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggersModule } from '../loggers/loggers.module';

import { ClientEntity } from './entities/client.entity';

import { ClientsService } from './services/clients.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity]), LoggersModule],
  providers: [ClientsService],
  exports: [ClientsService]
})
export class ClientsModule {}
