import { PASSWORD_LENGTH } from '@/lib/constants';
import { FORM_VALIDATION_ERRORS } from '@/lib/constants';

export const validatePassword = (password: string): string => {
  if (!password) return FORM_VALIDATION_ERRORS.PASSWORD.REQUIRED;
  if (password.length < PASSWORD_LENGTH) return FORM_VALIDATION_ERRORS.PASSWORD.MIN_LENGTH;
  return '';
};
