import { NotFoundException } from '@nestjs/common';

import { IErrorResponseMessage } from '../../shared/typings/ErrorResponseMessage';

export class VotatoonNotFoundException extends NotFoundException {
  constructor(errorMessage: IErrorResponseMessage) {
    super(errorMessage);
  }
}
