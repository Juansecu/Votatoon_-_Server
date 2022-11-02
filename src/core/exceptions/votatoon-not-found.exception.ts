import { NotFoundException } from '@nestjs/common';

import { IErrorResponseMessage } from '../../shared/typings/ResponseMessage';

export class VotatoonNotFoundException extends NotFoundException {
  constructor(errorMessage: IErrorResponseMessage) {
    super(errorMessage);
  }
}
