import { validateEmail } from './validateEmail';
import { FORM_VALIDATION_ERRORS } from '@/lib/constants';

describe('validateEmail', () => {
  it('returns required error when email is empty', () => {
    expect(validateEmail('')).toBe(FORM_VALIDATION_ERRORS.EMAIL.REQUIRED);
    expect(validateEmail('   ')).toBe(FORM_VALIDATION_ERRORS.EMAIL.REQUIRED);
  });

  it('returns invalid format error for malformed emails', () => {
    const invalidEmails = [
      'plainaddress',
      '#@%^%#$@#$@#.com',
      '@domain.com',
      'Joe Smith <email@domain.com>',
      'email.domain.com',
      'email@domain@domain.com',
    ];

    invalidEmails.forEach((email) => {
      expect(validateEmail(email)).toBe(FORM_VALIDATION_ERRORS.EMAIL.INVALID_FORMAT);
    });
  });

  it('accepts valid common email formats', () => {
    const validEmails = [
      'user@example.com',
      'user.name@example.com',
      'user+tag@example.co.uk',
      'user123@sub.domain.org',
      'user_name@example-domain.com',
      '1234567890@example.com',
      '_______@example.com',
      'user@123.123.123.123', // IP-домен (редко, но валидно)
    ];

    validEmails.forEach((email) => {
      expect(validateEmail(email)).toBe('');
    });
  });
});
