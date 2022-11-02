import { ConflictException } from '@nestjs/common';

import { IErrorResponseMessage } from '../../shared/typings/ErrorResponseMessage';

export class VotatoonConflictException extends ConflictException {
  constructor(errorMessage: IErrorResponseMessage) {
    super(errorMessage);
  }
}
