import { EContestantType } from '../../contestants/enums/contestant-type.enum';

import { ContestantVoteEntity } from '../entities/contestant-vote.entity';

const contestantVote1: ContestantVoteEntity = new ContestantVoteEntity();
const contestantVote2: ContestantVoteEntity = new ContestantVoteEntity();
const contestantVote3: ContestantVoteEntity = new ContestantVoteEntity();
const contestantVote4: ContestantVoteEntity = new ContestantVoteEntity();
const contestantVote5: ContestantVoteEntity = new ContestantVoteEntity();
const contestantVote6: ContestantVoteEntity = new ContestantVoteEntity();
const contestantVote7: ContestantVoteEntity = new ContestantVoteEntity();
const contestantVote8: ContestantVoteEntity = new ContestantVoteEntity();
export const contestantVotes: ContestantVoteEntity[] = [];

contestantVote1.contestantId = 1;
contestantVote1.contestantType = EContestantType.A;
contestantVote1.isActive = 0;
contestantVote1.largeImagePath = 'contestant1-large-image-path';
contestantVote1.name = 'Contestant 1';
contestantVote1.raceContestantId = 1;
contestantVote1.raceId = 1;
contestantVote1.smallImagePath = 'contestant1-small-image-path';
contestantVote1.voteTotalValue = 30;

contestantVote2.contestantId = 2;
contestantVote2.contestantType = EContestantType.B;
contestantVote2.isActive = 0;
contestantVote2.largeImagePath = 'contestant2-large-image-path';
contestantVote2.name = 'Contestant 2';
contestantVote2.raceContestantId = 2;
contestantVote2.raceId = 1;
contestantVote2.smallImagePath = 'contestant2-small-image-path';
contestantVote2.voteTotalValue = 20;

contestantVote3.contestantId = 3;
contestantVote3.contestantType = EContestantType.A;
contestantVote3.isActive = 0;
contestantVote3.largeImagePath = 'contestant3-large-image-path';
contestantVote3.name = 'Contestant 3';
contestantVote3.raceContestantId = 3;
contestantVote3.raceId = 2;
contestantVote3.smallImagePath = 'contestant3-small-image-path';
contestantVote3.voteTotalValue = 10;

contestantVote4.contestantId = 4;
contestantVote4.contestantType = EContestantType.B;
contestantVote4.isActive = 0;
contestantVote4.largeImagePath = 'contestant4-large-image-path';
contestantVote4.name = 'Contestant 4';
contestantVote4.raceContestantId = 4;
contestantVote4.raceId = 2;
contestantVote4.smallImagePath = 'contestant4-small-image-path';
contestantVote4.voteTotalValue = 40;

contestantVote5.contestantId = 5;
contestantVote5.contestantType = EContestantType.A;
contestantVote5.isActive = 1;
contestantVote5.largeImagePath = 'contestant5-large-image-path';
contestantVote5.name = 'Contestant 5';
contestantVote5.raceContestantId = 5;
contestantVote5.raceId = 3;
contestantVote5.smallImagePath = 'contestant5-small-image-path';
contestantVote5.voteTotalValue = 50;

contestantVote6.contestantId = 6;
contestantVote6.contestantType = EContestantType.B;
contestantVote6.isActive = 1;
contestantVote6.largeImagePath = 'contestant6-large-image-path';
contestantVote6.name = 'Contestant 6';
contestantVote6.raceContestantId = 6;
contestantVote6.raceId = 3;
contestantVote6.smallImagePath = 'contestant6-small-image-path';
contestantVote6.voteTotalValue = 60;

contestantVote7.contestantId = 7;
contestantVote7.contestantType = EContestantType.A;
contestantVote7.isActive = 0;
contestantVote7.largeImagePath = 'contestant7-large-image-path';
contestantVote7.name = 'Contestant 7';
contestantVote7.raceContestantId = 7;
contestantVote7.raceId = 4;
contestantVote7.smallImagePath = 'contestant7-small-image-path';
contestantVote7.voteTotalValue = null;

contestantVote8.contestantId = 8;
contestantVote8.contestantType = EContestantType.B;
contestantVote8.isActive = 0;
contestantVote8.largeImagePath = 'contestant8-large-image-path';
contestantVote8.name = 'Contestant 8';
contestantVote8.raceContestantId = 8;
contestantVote8.raceId = 4;
contestantVote8.smallImagePath = 'contestant8-small-image-path';
contestantVote8.voteTotalValue = null;

contestantVotes.push(
  contestantVote1,
  contestantVote2,
  contestantVote3,
  contestantVote4,
  contestantVote5,
  contestantVote6,
  contestantVote7,
  contestantVote8
);
