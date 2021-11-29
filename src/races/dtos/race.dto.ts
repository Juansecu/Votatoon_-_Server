import { ContestantDto } from '../../contestants/dtos/contestant.dto';

export class RaceDto {
  id: number;
  index: number;
  toonA: ContestantDto;
  toonB: ContestantDto;
  aVotesPercent: number;
  bVotesPercent: number;
  aVotesTotal: number;
  bVotesTotal: number;
  aSmallImagePath: string;
  bSmallImagePath: string;
  aLargeImagePath: string;
  bLargeImagePath: string;
  active: boolean;

  constructor(
    id: number,
    index: number,
    toonA: ContestantDto,
    toonB: ContestantDto,
    aVotesPercent: number,
    bVotesPercent: number,
    aVotesTotal: number,
    bVotesTotal: number,
    aSmallImagePath: string,
    bSmallImagePath: string,
    aLargeImagePath: string,
    bLargeImagePath: string,
    active: boolean
  ) {
    this.id = id;
    this.index = index;
    this.toonA = toonA;
    this.toonB = toonB;
    this.aVotesPercent = aVotesPercent;
    this.bVotesPercent = bVotesPercent;
    this.aVotesTotal = aVotesTotal;
    this.bVotesTotal = bVotesTotal;
    this.aSmallImagePath = aSmallImagePath;
    this.bSmallImagePath = bSmallImagePath;
    this.aLargeImagePath = aLargeImagePath;
    this.bLargeImagePath = bLargeImagePath;
    this.active = active;
  }
}
