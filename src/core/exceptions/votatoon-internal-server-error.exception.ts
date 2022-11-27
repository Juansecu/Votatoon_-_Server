import { InternalServerErrorException } from '@nestjs/common';

import { ErrorResMessage } from '../../shared/dtos/response/error.res.dto';

export class VotatoonInternalServerErrorException extends InternalServerErrorException {
  constructor(errorMessage: ErrorResMessage) {
    super(errorMessage);
  }
}
