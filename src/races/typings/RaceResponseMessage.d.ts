import { ContestantEntity } from '../../contestants/entities/contestant.entity';

export interface IRaceResponseMessage {
  id: number;
  index: number;
  toonA: ContestantEntity;
  toonB: ContestantEntity;
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
