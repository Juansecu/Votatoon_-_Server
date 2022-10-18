import { Injectable } from '@nestjs/common';

import { CryptoUtil } from './shared/utils/crypto.util';

@Injectable()
export class AppService {
  constructor(private readonly _CRYPTO_UTIL: CryptoUtil) {}

  generateCryptoInfo() {
    return {
      initVector: this._CRYPTO_UTIL.generateInitialVector(),
      securityKey: this._CRYPTO_UTIL.generateSecurityKey()
    };
  }

  getCrossDoman(): string {
    return `<?xml version="1.0" encoding="utf-8" ?>
      <cross-domain-policy>
        <allow-access-from domain="*"/>
      </cross-domain-policy>`;
  }
}
