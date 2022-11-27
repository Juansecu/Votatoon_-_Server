import { NotFoundException } from '@nestjs/common';

import { ErrorResMessage } from '../../shared/dtos/response/error.res.dto';

export class VotatoonNotFoundException extends NotFoundException {
  constructor(errorMessage: ErrorResMessage) {
    super(errorMessage);
  }
}
