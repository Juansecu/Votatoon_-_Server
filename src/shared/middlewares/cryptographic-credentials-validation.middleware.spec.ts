import { CryptographicCredentialsValidationMiddleware } from './cryptographic-credentials-validation.middleware';

describe('CryptographicCredentialsValidationMiddleware', () => {
  it('should be defined', () => {
    expect(new CryptographicCredentialsValidationMiddleware()).toBeDefined();
  });
});
