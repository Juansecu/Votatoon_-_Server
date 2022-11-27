import { ApiProperty } from '@nestjs/swagger';

export class SuccessResMessage {
  @ApiProperty({
    description: 'Whether the request was successful',
    example: true,
    readOnly: true,
    type: Boolean
  })
  success: boolean;
  @ApiProperty({
    description: 'The success message',
    example: 'The vote has been cast',
    readOnly: true,
    type: String
  })
  message: string;
}
