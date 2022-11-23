import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';

import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService]
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getCrossDoman()).toBe(
        `<?xml version="1.0" encoding="utf-8" ?>
      <cross-domain-policy>
        <allow-access-from domain="*"/>
      </cross-domain-policy>`
      );
    });
  });
});
