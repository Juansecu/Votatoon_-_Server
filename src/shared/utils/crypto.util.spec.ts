import { Test, TestingModule } from '@nestjs/testing';

import { LoggersModule } from '../../loggers/loggers.module';

import { CryptoUtil } from './crypto.util';

describe('CryptoUtil', () => {
  let cryptoUtil: CryptoUtil;
  let encryptedIpv4: string;
  let encryptedIpv6: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggersModule],
      providers: [CryptoUtil]
    }).compile();

    cryptoUtil = module.get<CryptoUtil>(CryptoUtil);
  });

  describe('isCryptographicInfoValid', () => {
    it('#1 should return true if the cryptographic info is valid', () => {
      expect(cryptoUtil.isCryptographicInfoValid()).toBe(true);
    });
  });

  describe('encrypt', () => {
    it('#1 should encrypt IPv4 address', () => {
      const encryptedIpAddress: string = cryptoUtil.encrypt('127.0.0.1');
      expect(encryptedIpAddress).toHaveLength(114);
      encryptedIpv4 = encryptedIpAddress;
    });

    it('#2 should encrypt IPv6 address', () => {
      const encryptedIpAddress: string = cryptoUtil.encrypt('::1');
      expect(encryptedIpAddress).toHaveLength(114);
      encryptedIpv6 = encryptedIpAddress;
    });
  });

  describe('decrypt', () => {
    it('#1 should decrypt IPv4 address', () => {
      const decryptedIpAddress: string = cryptoUtil.decrypt(encryptedIpv4);

      expect(decryptedIpAddress).toHaveLength(9);
      expect(decryptedIpAddress).toBe('127.0.0.1');
    });

    it('#2 should decrypt IPv6 address', () => {
      const decryptedIpAddress: string = cryptoUtil.decrypt(encryptedIpv6);

      expect(decryptedIpAddress).toHaveLength(3);
      expect(decryptedIpAddress).toBe('::1');
    });
  });
});
