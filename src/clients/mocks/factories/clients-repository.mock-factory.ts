import { ClientEntity } from '../../entities/client.entity';

export const clientsRepository: jest.Mock = jest.fn(() => ({
  findOne: jest.fn((client: ClientEntity) => client),
  save: jest.fn((client: ClientEntity) => client)
}));
