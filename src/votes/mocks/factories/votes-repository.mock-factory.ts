import { VoteEntity } from '../../entities/vote.entity';

export const votesRepository: jest.Mock = jest.fn(() => ({
  findOne: jest.fn((vote: VoteEntity) => vote)
}));
