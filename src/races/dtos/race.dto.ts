export class RaceDto {
  id: number;
  index: number;
  toonA: string;
  toonB: string;
  aVotesPercent: number;
  bVotesPercent: number;
  aVotesTotal: number;
  bVotesTotal: number;
  aSmallImagePath: string;
  bSmallImagePath: string;
  aLargeImagePath: string;
  bLargeImagePath: string;
  active: boolean;
}
