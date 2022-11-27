import { ApiProperty } from '@nestjs/swagger';

export class RaceResDto {
  @ApiProperty({
    description: 'The ID of the race',
    example: 1,
    readOnly: true,
    type: Number,
    uniqueItems: true
  })
  id: number;
  @ApiProperty({
    description: 'The index of the race information',
    example: 0,
    readOnly: true,
    type: Number,
    uniqueItems: true
  })
  index: number;
  @ApiProperty({
    description: 'The name of the contestant A',
    example: 'Contestant A',
    readOnly: true,
    type: String,
    uniqueItems: true
  })
  toonA: string;
  @ApiProperty({
    description: 'The name of the contestant B',
    example: 'Contestant B',
    readOnly: true,
    type: String,
    uniqueItems: true
  })
  toonB: string;
  @ApiProperty({
    description: 'The percentage of votes for contestant A',
    example: 50,
    readOnly: true,
    type: Number
  })
  aVotesPercent: number;
  @ApiProperty({
    description: 'The percentage of votes for contestant B',
    example: 50,
    readOnly: true,
    type: Number
  })
  bVotesPercent: number;
  @ApiProperty({
    description: 'The number of votes for contestant A',
    example: 100,
    readOnly: true,
    type: Number
  })
  aVotesTotal: number;
  @ApiProperty({
    description: 'The number of votes for contestant B',
    example: 100,
    readOnly: true,
    type: Number
  })
  bVotesTotal: number;
  @ApiProperty({
    description: 'The link address for contestant A small image',
    example: 'https://www.example.com/imageA-small.jpg',
    readOnly: true,
    type: String,
    uniqueItems: true
  })
  aSmallImagePath: string;
  @ApiProperty({
    description: 'The link address for contestant B small image',
    example: 'https://www.example.com/imageB-small.jpg',
    readOnly: true,
    type: String,
    uniqueItems: true
  })
  bSmallImagePath: string;
  @ApiProperty({
    description: 'The link address for contestant A large image',
    example: 'https://www.example.com/imageA-large.jpg',
    readOnly: true,
    type: String,
    uniqueItems: true
  })
  aLargeImagePath: string;
  @ApiProperty({
    description: 'The link address for contestant B large image',
    example: 'https://www.example.com/imageB-large.jpg',
    readOnly: true,
    type: String,
    uniqueItems: true
  })
  bLargeImagePath: string;
  @ApiProperty({
    description: 'Whether the race is active',
    example: true,
    readOnly: true,
    type: Boolean
  })
  active: boolean;
}
