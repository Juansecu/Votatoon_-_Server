import { Test, TestingModule } from '@nestjs/testing';

import { ConsoleLoggerService } from './console-logger.service';

describe('ConsoleLoggerService', () => {
  let consoleLoggerService: ConsoleLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsoleLoggerService]
    }).compile();

    consoleLoggerService = await module.resolve<ConsoleLoggerService>(
      ConsoleLoggerService
    );
  });

  it('consoleLoggerService should be defined', () => {
    expect(consoleLoggerService).toBeDefined();
  });
});
