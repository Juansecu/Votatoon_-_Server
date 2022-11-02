import { EErrorCode } from '../../core/enums/error-code.enum';

export interface IErrorResponseMessage {
  error: EErrorCode;
  message: string;
}

export interface ISuccessResponseMessage {
  success: boolean;
  message: string;
}
