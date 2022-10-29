import { ClientDataRetrievingMiddleware } from './client-data-retrieving.middleware';

describe('ClientDataRetrievingMiddleware', () => {
  it('should be defined', () => {
    expect(new ClientDataRetrievingMiddleware()).toBeDefined();
  });
});
