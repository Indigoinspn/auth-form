import { LoginResponse, LoginCredentials } from '@/types/auth';
import { DELAY_DURATION, ERROR_CODES, INVALID_EMAIL, JWT_TOKEN, VALID_CREDENTIALS } from '@/lib/constants';
import { simulateNetworkError } from '../utils/network/simulateNetworkError';
import { createErrorFromCode } from '../utils/errors/getErrorMessage';
import { delay } from '../utils/common/delay';

export const mockLogin = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  await delay(DELAY_DURATION);

  const { email, password } = credentials;

  // ✅ Successful
  if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
    return {
      email: VALID_CREDENTIALS.email,
      token: JWT_TOKEN,
      requires2fa: true,
    };
  }

  // ❌ Connection lost
  if (email === INVALID_EMAIL.connection_lost) {
    simulateNetworkError();
  }

  // ❌ Too many attempts
  if (email === INVALID_EMAIL.attempts_limited) {
    throw createErrorFromCode(ERROR_CODES.RATE_LIMITED);
  } else {
    throw createErrorFromCode(ERROR_CODES.INVALID_CREDENTIALS);
  }
};
