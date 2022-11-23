import { ContestantVoteEntity } from '../../entities/contestant-vote.entity';

export const contestantVotesRepository: jest.Mock = jest.fn(() => ({
  find: jest.fn((contestantVotes: ContestantVoteEntity[]) => contestantVotes),
  findOne: jest.fn((contestantVote: ContestantVoteEntity) => contestantVote)
}));
