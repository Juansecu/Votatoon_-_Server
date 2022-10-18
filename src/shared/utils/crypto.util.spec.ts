import { Test, TestingModule } from '@nestjs/testing';

import { LoggersModule } from '../../loggers/loggers.module';

import { CryptoUtil } from './crypto.util';

describe('CryptoUtil', () => {
  let cryptoUtil: CryptoUtil;
  let encryptedIp: string;
  let initVector: string;
  let securityKey: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggersModule],
      providers: [CryptoUtil]
    }).compile();

    cryptoUtil = module.get<CryptoUtil>(CryptoUtil);
  });

  it('#1 should generate initial vector', () => {
    const initialVector: string = cryptoUtil.generateInitialVector();
    expect(initialVector).toHaveLength(32);
    initVector = initialVector;
  });

  it('#2 should generate security key', () => {
    const secKey: string = cryptoUtil.generateSecurityKey();
    expect(secKey).toHaveLength(64);
    securityKey = secKey;
  });

  it('#3 should encrypt IP address', () => {
    const encryptedIpAddress: string = cryptoUtil.encrypt(
      '127.0.0.1',
      securityKey,
      initVector
    );

    expect(encryptedIpAddress).toHaveLength(32);

    encryptedIp = encryptedIpAddress;
  });

  it('#4 should decrypt IP address', () => {
    const decryptedIpAddress: string = cryptoUtil.decrypt(
      encryptedIp,
      securityKey,
      initVector
    );

    expect(decryptedIpAddress).toHaveLength(9);
    expect(decryptedIpAddress).toBe('127.0.0.1');
  });
});
