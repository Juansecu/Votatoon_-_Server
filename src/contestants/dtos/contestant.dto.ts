import { ContestantEntity } from '../entities/contestant.entity';

export class ContestantDto {
  contestantId: number;
  name: string;
  smallImagePath: string;
  largeImagePath: string;

  constructor(contestantEntity: ContestantEntity) {
    this.contestantId = contestantEntity.contestantId;
    this.name = contestantEntity.name;
    this.smallImagePath = contestantEntity.smallImagePath;
    this.largeImagePath = contestantEntity.largeImagePath;
  }
}
