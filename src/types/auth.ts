export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ValidateTwoFactorParams {
  code: string;
  timeLeft: number;
}

export interface ValidationResult {
  success: boolean;
  error?: {
    code: string;
    message: string;
  };
}

export type ApiError = {
  code: string;
  message?: string;
};

export interface LoginResponse {
  email: string;
  token: string;
  requires2fa: boolean;
}

export interface VerifyResponse {
  token: string;
}

export type LoginError = {
  message: string;
};
