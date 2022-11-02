import { InternalServerErrorException } from '@nestjs/common';

import { IErrorResponseMessage } from '../../shared/typings/ResponseMessage';

export class VotatoonInternalServerErrorException extends InternalServerErrorException {
  constructor(errorMessage: IErrorResponseMessage) {
    super(errorMessage);
  }
}
