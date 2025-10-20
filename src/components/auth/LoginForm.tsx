import { FormEvent, useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Header } from '@/components/ui/Header';
import emailIconUrl from '@/assets/user.svg';
import passwordIconUrl from '@/assets/lock.svg';
import { LOGIN_FORM_TITLE } from '@/lib/constants';
import { ContentWrapper } from '@/components/ui/ContentWrapper.styles';
import { Message } from '@/components/ui/Message';
import { validateEmail } from '@/lib/utils/validation/validateEmail';
import { validatePassword } from '@/lib/utils/validation/validatePassword';

interface LoginFormProps {
  onSubmit: (credentials: { email: string; password: string }) => void;
  isLoading?: boolean;
  error?: string;
  onClearError?: () => void;
}

export const LoginForm = ({ onSubmit, isLoading = false, error, onClearError }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });

  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  const showEmailError = touched.email && !!emailError;
  const showPasswordError = touched.password && !!passwordError;

  const isFormValid = email !== '' && password !== '' && !emailError && !passwordError;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit({ email, password });
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.trim());

    if (error && onClearError) {
      const handler = setTimeout(() => {
        onClearError();
      }, 0);

      return () => clearTimeout(handler);
    }
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value.trim());

    if (error && onClearError) {
      const handler = setTimeout(() => {
        onClearError();
      }, 0);

      return () => clearTimeout(handler);
    }
  };

  return (
    <ContentWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <Header title={LOGIN_FORM_TITLE} />

        <Input
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
          error={showEmailError ? emailError : ''}
          disabled={isLoading}
          autoComplete="email"
          placeholder="Email"
          icon={emailIconUrl}
          imageAltText="Email icon"
        />

        <Input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
          error={showPasswordError ? passwordError : ''}
          disabled={isLoading}
          autoComplete="current-password"
          placeholder="Password"
          icon={passwordIconUrl}
          imageAltText="Password icon"
        />

        {error && (
          <Message $variant="error" role="alert" $marginBottom $alignCenter>
            {error}
          </Message>
        )}

        <Button type="submit" isLoading={isLoading} disabled={!isFormValid || !!error}>
          Log in
        </Button>
      </form>
    </ContentWrapper>
  );
};
