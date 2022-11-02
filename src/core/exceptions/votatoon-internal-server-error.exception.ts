import { InternalServerErrorException } from '@nestjs/common';

import { IErrorResponseMessage } from '../../shared/typings/ErrorResponseMessage';

export class VotatoonInternalServerErrorException extends InternalServerErrorException {
  constructor(errorMessage: IErrorResponseMessage) {
    super(errorMessage);
  }
}
