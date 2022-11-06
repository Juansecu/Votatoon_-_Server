import { Test, TestingModule } from '@nestjs/testing';

import { LoggersModule } from '../../loggers/loggers.module';

import { CryptoUtil } from './crypto.util';

describe('CryptoUtil', () => {
  let cryptoUtil: CryptoUtil;
  let encryptedIp: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggersModule],
      providers: [CryptoUtil]
    }).compile();

    cryptoUtil = module.get<CryptoUtil>(CryptoUtil);
  });

  it('#1 should encrypt IP address', () => {
    const encryptedIpAddress: string = cryptoUtil.encrypt('127.0.0.1');
    expect(encryptedIpAddress).toHaveLength(32);
    encryptedIp = encryptedIpAddress;
  });

  it('#2 should decrypt IP address', () => {
    const decryptedIpAddress: string = cryptoUtil.decrypt(encryptedIp);

    expect(decryptedIpAddress).toHaveLength(9);
    expect(decryptedIpAddress).toBe('127.0.0.1');
  });
});
