import { ApiProperty } from '@nestjs/swagger';

import { EErrorCode } from '../../../core/enums/error-code.enum';

export class ErrorResMessage {
  @ApiProperty({
    description: 'The error code',
    enum: EErrorCode,
    example: EErrorCode.INTERNAL_SERVER_ERROR,
    readOnly: true,
    type: String
  })
  error: EErrorCode;
  @ApiProperty({
    description: 'The error message',
    example: 'Internal server error',
    readOnly: true,
    type: String
  })
  message: string;
}
