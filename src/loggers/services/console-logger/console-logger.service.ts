import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.TRANSIENT
})
export class ConsoleLoggerService extends ConsoleLogger {
  override debug(message: string): void {
    super.debug(message);
  }

  override error(message): void {
    super.error(message);
  }

  override log(message: string): void {
    super.log(message);
  }

  override verbose(message: string): void {
    super.verbose(message);
  }

  override warn(message: string): void {
    super.warn(message);
  }
}
