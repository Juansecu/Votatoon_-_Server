import { Injectable } from '@nestjs/common';
import { CipherAlgorithm, decrypt, encrypt, Mode } from 'js-rijndael';

import { ConsoleLoggerService } from '../../loggers/services/console-logger/console-logger.service';

import { bufferToArray } from './functions/buffer-to-array/buffer-to-array.function';

@Injectable()
export class CryptoUtil {
  private static readonly _ALGORITHM: CipherAlgorithm = 'rijndael-256';
  private static readonly _INIT_VECTOR: string = process.env.INIT_VECTOR;
  private static readonly _MODE: Mode = 'cbc';
  private static readonly _SECURITY_KEY: string = process.env.SECURITY_KEY;

  constructor(private readonly _CONSOLE_LOGGER_SERVICE: ConsoleLoggerService) {}

  decrypt(bin: string): string {
    const binArray: number[] = bin.split(',').map(Number);
    const initVectorArray: number[] = bufferToArray(
      this.getBytesFromString(CryptoUtil._INIT_VECTOR)
    );
    const keyArray: number[] = bufferToArray(
      this.getBytesFromString(CryptoUtil._SECURITY_KEY)
    );

    return String.fromCharCode(
      ...(decrypt(
        binArray,
        initVectorArray,
        keyArray,
        CryptoUtil._ALGORITHM,
        CryptoUtil._MODE
      ) as number[])
    );
  }

  encrypt(str: string): string {
    const initVectorArray: number[] = bufferToArray(
      this.getBytesFromString(CryptoUtil._INIT_VECTOR)
    );
    const keyArray: number[] = bufferToArray(
      this.getBytesFromString(CryptoUtil._SECURITY_KEY)
    );
    const strArray: number[] = bufferToArray(Buffer.from(str));

    return encrypt(
      strArray,
      initVectorArray,
      keyArray,
      CryptoUtil._ALGORITHM,
      CryptoUtil._MODE
    ).toString();
  }

  isCryptographicInfoValid(): boolean {
    if (!CryptoUtil._INIT_VECTOR || !CryptoUtil._SECURITY_KEY) {
      this._CONSOLE_LOGGER_SERVICE.error(
        'Both INIT_VECTOR or SECURITY_KEY are not defined'
      );

      return false;
    }

    if (CryptoUtil._INIT_VECTOR.length !== 64) {
      this._CONSOLE_LOGGER_SERVICE.error('INIT_VECTOR length is not 64');
      return false;
    } else if (CryptoUtil._SECURITY_KEY.length !== 64) {
      this._CONSOLE_LOGGER_SERVICE.error('SECURITY_KEY length is not 64');
      return false;
    }

    return true;
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
