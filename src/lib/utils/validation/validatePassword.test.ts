// src/lib/utils/validation/validatePassword.test.ts
import { validatePassword } from './validatePassword';
import { FORM_VALIDATION_ERRORS, PASSWORD_LENGTH } from '@/lib/constants';

describe('validatePassword', () => {
  it('returns required error when password is empty', () => {
    expect(validatePassword('')).toBe(FORM_VALIDATION_ERRORS.PASSWORD.REQUIRED);
  });

  it(`returns min length error when password has less than ${PASSWORD_LENGTH} characters`, () => {
    const shortPassword = 'a'.repeat(PASSWORD_LENGTH - 1);
    expect(validatePassword(shortPassword)).toBe(FORM_VALIDATION_ERRORS.PASSWORD.MIN_LENGTH);
  });

  it('accepts password with exactly min length', () => {
    const validPassword = 'a'.repeat(PASSWORD_LENGTH);
    expect(validatePassword(validPassword)).toBe('');
  });

  it('accepts long password', () => {
    const longPassword = 'a'.repeat(100);
    expect(validatePassword(longPassword)).toBe('');
  });
});
