export * from './styles';

export const LOGIN_FORM_TITLE = 'Sign in to your account to continue';
export const TWO_FACTOR_FORM_TITLE = 'Two-Factor Authentication';
export const TWO_FACTOR_FORM_SUBTITLE = 'Enter the 6-digit code from the Google Authenticator app';
export const SUCCESS_AUTH_TITLE = 'You have been successfully authenticated';

export const TWO_FACTOR_CODE_LENGTH = 6;
export const PASSWORD_LENGTH = 8;
export const TIMER_DURATION = 30;
export const DELAY_DURATION = 800;
export const EMAIL_VALIDATION_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Credentials
export const CORRECT_CODE = '123456';
export const CONNECTION_LOST_CODE = '888888';
export const VALID_CREDENTIALS = {
  email: 'valid_email@mail.ru',
  password: '55555555',
};

export const INVALID_EMAIL = {
  connection_lost: 'connection_lost@yahoo.com',
  attempts_limited: 'attempts_limited@ya.ru',
};

export const JWT_TOKEN = 'fake-jwt-token';

// Login form validation error messages
export const FORM_VALIDATION_ERRORS = {
  EMAIL: {
    REQUIRED: 'Email is required',
    INVALID_FORMAT: 'Invalid email format',
  },
  PASSWORD: {
    REQUIRED: 'Password is required',
    MIN_LENGTH: `Password must be at least ${PASSWORD_LENGTH} characters`,
  },
};

// API Error messages
// Error codes
export const ERROR_CODES = {
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  INVALID_CODE: 'INVALID_CODE',
  CODE_EXPIRED: 'CODE_EXPIRED',
  NETWORK_ERROR: 'NETWORK_ERROR',
  RATE_LIMITED: 'RATE_LIMITED',
  UNEXPECTED_ERROR: 'UNEXPECTED_ERROR',
} as const;

// Messages
export const ERROR_MESSAGES = {
  [ERROR_CODES.INVALID_CREDENTIALS]: 'Invalid email or password',
  [ERROR_CODES.INVALID_CODE]: 'Invalid 2FA code. Please try again.',
  [ERROR_CODES.CODE_EXPIRED]: 'Code expired. Request a new one.',
  [ERROR_CODES.NETWORK_ERROR]: `Unable to connect to the server.\nPlease check your internet connection.`,
  [ERROR_CODES.RATE_LIMITED]: 'Too many attempts. Please try again later.',
  [ERROR_CODES.UNEXPECTED_ERROR]: 'An unexpected error occurred. Please try again.',
} as const;
