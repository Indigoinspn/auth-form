import { useMutation } from '@tanstack/react-query';
import { validateCodeLogic } from '@/lib/api/twoFactorApi';
import { ERROR_CODES, ERROR_MESSAGES } from '@/lib/constants';
import { ValidationResult, ValidateTwoFactorParams } from '@/types';

export const useTwoFactorManager = () => {
  const mutation = useMutation<ValidationResult, unknown, ValidateTwoFactorParams>({
    mutationFn: validateCodeLogic,
  });

  const isSuccess = mutation.data?.success === true;
  const isError = mutation.data?.success === false;
  const error = mutation.data?.error;

  return {
    // Function
    validateCode: mutation.mutate,

    // States
    isLoading: mutation.isPending,
    isSuccess,
    isError,
    isCodeExpired: error?.code === ERROR_CODES.CODE_EXPIRED,
    isNetworkError: error?.code === ERROR_CODES.NETWORK_ERROR,
    errorMessage: isError ? error?.message || ERROR_MESSAGES['UNEXPECTED_ERROR'] : null,

    // Reset
    resetValidation: mutation.reset,
  };
};
