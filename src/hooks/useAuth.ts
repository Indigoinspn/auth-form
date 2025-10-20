import { useMutation } from '@tanstack/react-query';
import { mockLogin } from '@/lib/api/authApi';
import type { LoginResponse, LoginCredentials, LoginError } from '@/types/auth';

export const useAuth = () => {
  const loginMutation = useMutation<LoginResponse, LoginError, LoginCredentials>({
    mutationFn: mockLogin,
  });

  return {
    login: loginMutation.mutate,
    isLoginLoading: loginMutation.isPending,
    isLoginError: loginMutation.isError,
    loginError: loginMutation.error,
    loginData: loginMutation.data,
    resetLogin: loginMutation.reset,
  };
};
