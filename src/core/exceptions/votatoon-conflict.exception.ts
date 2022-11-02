import { ConflictException } from '@nestjs/common';

import { IErrorResponseMessage } from '../../shared/typings/ResponseMessage';

export class VotatoonConflictException extends ConflictException {
  constructor(errorMessage: IErrorResponseMessage) {
    super(errorMessage);
  }
}
