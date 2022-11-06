import { Injectable } from '@nestjs/common';
import { Cipher, createCipheriv, createDecipheriv, Decipher } from 'crypto';

import { ConsoleLoggerService } from '../../loggers/services/console-logger/console-logger.service';

@Injectable()
export class CryptoUtil {
  private static readonly _ALGORITHM = 'aes-256-cbc';
  private static readonly _INIT_VECTOR: string = process.env.INIT_VECTOR;
  private static readonly _SECURITY_KEY: string = process.env.SECURITY_KEY;

  constructor(private readonly _CONSOLE_LOGGER_SERVICE: ConsoleLoggerService) {}

  decrypt(bin: string): string {
    let decryptedData: string;

    const decipher: Decipher = this.createDecipher(
      this.getBytesFromString(CryptoUtil._SECURITY_KEY),
      this.getBytesFromString(CryptoUtil._INIT_VECTOR)
    );

    decryptedData = decipher.update(bin, 'hex', 'utf-8');
    decryptedData += decipher.final('utf-8');

    return decryptedData;
  }

  encrypt(str: string): string {
    let encryptedData: string;

    const cipher: Cipher = this.createCipher(
      this.getBytesFromString(CryptoUtil._SECURITY_KEY),
      this.getBytesFromString(CryptoUtil._INIT_VECTOR)
    );

    encryptedData = cipher.update(str, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');

    return encryptedData;
  }

  isCryptographicInfoValid(): boolean {
    if (!CryptoUtil._INIT_VECTOR || !CryptoUtil._SECURITY_KEY) {
      this._CONSOLE_LOGGER_SERVICE.error(
        'Both INIT_VECTOR or SECURITY_KEY are not defined'
      );

      return false;
    }

    if (CryptoUtil._INIT_VECTOR.length !== 32) {
      this._CONSOLE_LOGGER_SERVICE.error('INIT_VECTOR length is not 32');
      return false;
    } else if (CryptoUtil._SECURITY_KEY.length !== 64) {
      this._CONSOLE_LOGGER_SERVICE.error('SECURITY_KEY length is not 64');
      return false;
    }

    return true;
  }

  private createCipher(securityKey: Buffer, initVector: Buffer): Cipher {
    return createCipheriv(CryptoUtil._ALGORITHM, securityKey, initVector);
  }

  private createDecipher(securityKey: Buffer, initVector: Buffer): Decipher {
    return createDecipheriv(CryptoUtil._ALGORITHM, securityKey, initVector);
  }

  private getBytesFromString(str: string): Buffer {
    if (str.length % 2 !== 0)
      throw new Error(
        'String length must have an even number of hex digits to convert to bytes'
      );

    const bytesCount: number = str.length / 2;
    const byteArray: Uint8Array = new Uint8Array(bytesCount);

    for (let i = 0; i < bytesCount; i++)
      byteArray[i] = parseInt(str.substring(i * 2, 2), 16);

    return Buffer.from(byteArray);
  }
}
