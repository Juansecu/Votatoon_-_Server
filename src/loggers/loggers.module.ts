import { Module } from '@nestjs/common';

import { ConsoleLoggerService } from './services/console-logger/console-logger.service';

@Module({
  providers: [ConsoleLoggerService],
  exports: [ConsoleLoggerService]
})
export class LoggersModule {}
