import { ApiError } from '@/types';
import { ERROR_CODES, ERROR_MESSAGES } from '@/lib/constants';

export const getErrorMessage = (error: unknown): string => {
  let code: string | undefined;

  if (error && typeof error === 'object') {
    if ('code' in error && typeof error.code === 'string') {
      code = error.code;
    }
  }

  if (code && code in ERROR_MESSAGES) {
    return ERROR_MESSAGES[code as keyof typeof ERROR_MESSAGES];
  }

  return ERROR_MESSAGES[ERROR_CODES.UNEXPECTED_ERROR];
};

export const createErrorFromCode = (code: keyof typeof ERROR_MESSAGES): ApiError => {
  return {
    code,
    message: ERROR_MESSAGES[code],
  };
};
