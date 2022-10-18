import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly _APP_SERVICE: AppService) {}

  @Get('generate-crypto-info')
  generateCryptoInfo() {
    return this._APP_SERVICE.generateCryptoInfo();
  }

  @Get('crossdomain.xml')
  getCrossDoman(): string {
    return this._APP_SERVICE.getCrossDoman();
  }
}
