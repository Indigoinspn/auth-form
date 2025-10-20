import { delay } from '@/lib/utils/common/delay';
import { CONNECTION_LOST_CODE, CORRECT_CODE, DELAY_DURATION, ERROR_CODES, ERROR_MESSAGES } from '@/lib/constants';
import { ValidateTwoFactorParams, ValidationResult } from '@/types';

export const validateCodeLogic = async ({ code, timeLeft }: ValidateTwoFactorParams): Promise<ValidationResult> => {
  await delay(DELAY_DURATION);

  if (timeLeft <= 0) {
    return {
      success: false,
      error: { code: ERROR_CODES.CODE_EXPIRED, message: ERROR_MESSAGES['CODE_EXPIRED'] },
    };
  }
  if (code === CONNECTION_LOST_CODE) {
    return {
      success: false,
      error: { code: ERROR_CODES.NETWORK_ERROR, message: ERROR_MESSAGES['NETWORK_ERROR'] },
    };
  }
  if (!code || code !== CORRECT_CODE) {
    return {
      success: false,
      error: { code: ERROR_CODES.INVALID_CODE, message: ERROR_MESSAGES['INVALID_CODE'] },
    };
  }

  return { success: true };
};
