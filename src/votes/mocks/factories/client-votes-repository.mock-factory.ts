import { ClientVoteEntity } from '../../entities/client-vote.entity';

export const clientVotesRepository: jest.Mock = jest.fn(() => ({
  save: jest.fn((clientVote: ClientVoteEntity) => clientVote)
}));
