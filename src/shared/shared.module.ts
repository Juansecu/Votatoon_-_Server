import { Module } from '@nestjs/common';

import { LoggersModule } from '../loggers/loggers.module';

import { CryptoUtil } from './utils/crypto.util';

@Module({
  imports: [LoggersModule],
  providers: [CryptoUtil],
  exports: [CryptoUtil]
})
export class SharedModule {}
