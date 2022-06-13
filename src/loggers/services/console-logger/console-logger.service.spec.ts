import { Test, TestingModule } from '@nestjs/testing';

import { ConsoleLoggerService } from './console-logger.service';

describe('ConsoleLoggerService', () => {
  let consoleLoggerService: ConsoleLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsoleLoggerService]
    }).compile();

    consoleLoggerService =
      module.get<ConsoleLoggerService>(ConsoleLoggerService);
  });

  it('should be defined', () => {
    expect(consoleLoggerService).toBeDefined();
  });
});
