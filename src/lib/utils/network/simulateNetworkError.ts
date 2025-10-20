import { ERROR_CODES } from '@/lib/constants';

export const simulateNetworkError = (): never => {
  const error = new Error('Failed to fetch') as Error & { code?: string };

  error.code = ERROR_CODES.NETWORK_ERROR;
  throw error;
};
