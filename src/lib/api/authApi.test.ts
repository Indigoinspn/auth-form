import { mockLogin } from './authApi';
import { VALID_CREDENTIALS, JWT_TOKEN, INVALID_EMAIL, ERROR_CODES } from '@/lib/constants';

describe('mockLogin', () => {
  it('returns success for valid credentials', async () => {
    const result = await mockLogin({
      email: VALID_CREDENTIALS.email,
      password: VALID_CREDENTIALS.password,
    });

    expect(result).toEqual({
      email: VALID_CREDENTIALS.email,
      token: JWT_TOKEN,
      requires2fa: true,
    });
  });

  it('throws network error with correct code', async () => {
    try {
      await mockLogin({ email: INVALID_EMAIL.connection_lost, password: 'any' });
      throw new Error('Expected error was not thrown');
    } catch (error) {
      expect((error as Error & { code?: string }).code).toBe(ERROR_CODES.NETWORK_ERROR);
    }
  });

  it('throws rate limit error for attempts_limited email', async () => {
    try {
      await mockLogin({ email: INVALID_EMAIL.attempts_limited, password: 'any' });
      throw new Error('Expected error was not thrown');
    } catch (error) {
      expect((error as Error & { code?: string }).code).toBe(ERROR_CODES.RATE_LIMITED);
    }
  });
});
