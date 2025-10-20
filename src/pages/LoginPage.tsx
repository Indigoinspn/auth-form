import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';
import { getErrorMessage } from '@/lib/utils/errors/getErrorMessage';

interface LoginPageProps {
  onLoginSuccess: (email: string, token: string, requires2fa: boolean) => void;
}

export const LoginPage = ({ onLoginSuccess }: LoginPageProps) => {
  const { login, isLoginLoading, isLoginError, loginError, loginData, resetLogin } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async ({ email, password }: { email: string; password: string }) => {
    setError(null);
    login({ email, password });
  };

  const handleClearError = () => {
    setError(null);
    resetLogin();
  };

  useEffect(() => {
    if (loginData) {
      const { email, token, requires2fa } = loginData;
      onLoginSuccess(email, token, requires2fa);
    }
  }, [loginData, onLoginSuccess]);

  useEffect(() => {
    if (isLoginError && loginError) {
      setError(getErrorMessage(loginError));
    }
  }, [isLoginError, loginError]);

  return (
    <AuthLayout>
      <LoginForm onSubmit={handleLogin} isLoading={isLoginLoading} error={error || undefined} onClearError={handleClearError} />
    </AuthLayout>
  );
};
