import { EMAIL_VALIDATION_REGEXP, FORM_VALIDATION_ERRORS } from '@/lib/constants';

export const validateEmail = (email: string): string => {
  const trimmed = email.trim();
  if (!trimmed) return FORM_VALIDATION_ERRORS.EMAIL.REQUIRED;
  const regExp = EMAIL_VALIDATION_REGEXP;
  if (!regExp.test(trimmed)) return FORM_VALIDATION_ERRORS.EMAIL.INVALID_FORMAT;
  return '';
};
