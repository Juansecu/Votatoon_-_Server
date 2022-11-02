import { EErrorCode } from '../../core/enums/error-code.enum';

export interface IErrorResponseMessage {
  error: EErrorCode;
  message: string;
}
