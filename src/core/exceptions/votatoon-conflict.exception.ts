import { ConflictException } from '@nestjs/common';

import { ErrorResMessage } from '../../shared/dtos/response/error.res.dto';

export class VotatoonConflictException extends ConflictException {
  constructor(errorMessage: ErrorResMessage) {
    super(errorMessage);
  }
}
