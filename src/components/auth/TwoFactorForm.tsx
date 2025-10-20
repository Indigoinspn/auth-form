import { FC, FormEvent, useEffect, useState } from 'react';
import { TIMER_DURATION, TWO_FACTOR_FORM_SUBTITLE, TWO_FACTOR_FORM_TITLE } from '@/lib/constants';
import { Message } from '@/components/ui/Message';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { ContentWrapper } from '../ui/ContentWrapper.styles';
import { CodeFields } from '../ui/CodeInput';
import { useTwoFactorManager } from '@/hooks/useTwoFactorManager';
import { useCountdown } from '@/hooks/useCountdown';
import { BackButton } from '../ui/BackButton';
import { Timer } from '../ui/Timer';

interface TwoFactorFormProps {
  onVerifySuccess: () => void;
  onBack: () => void;
}

export const TwoFactorForm: FC<TwoFactorFormProps> = ({ onVerifySuccess, onBack }) => {
  const { validateCode, isLoading, isSuccess, isError, isCodeExpired, isNetworkError, errorMessage, resetValidation } =
    useTwoFactorManager();

  const { timeLeft, start: startTimer, reset: resetTimer } = useCountdown(TIMER_DURATION);
  const [codeInput, setCodeInput] = useState<string[]>(Array(6).fill(''));
  const isFormFilled = codeInput.every((digit) => digit !== '');

  const showGetNewButton = isCodeExpired;

  const onInputChange = (value: string[]) => {
    setCodeInput(value);

    if (!isCodeExpired && !isNetworkError) {
      resetValidation();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    resetValidation();
    const code = codeInput.join('');
    validateCode({ code, timeLeft });
  };

  const handleGetNewCode = () => {
    setCodeInput(Array(6).fill(''));
    resetValidation();
    resetTimer();
  };

  useEffect(() => {
    if (isSuccess) {
      onVerifySuccess();
      resetValidation();
      resetTimer();
    }
  }, [onVerifySuccess, resetTimer, isSuccess, resetValidation]);

  useEffect(() => {
    startTimer();
  }, [startTimer]);

  return (
    <ContentWrapper>
      <form onSubmit={handleSubmit}>
        <BackButton onClick={onBack} disabled={isLoading} />

        <Header title={TWO_FACTOR_FORM_TITLE} subtitle={TWO_FACTOR_FORM_SUBTITLE} />

        <Timer timeLeft={timeLeft} />

        <CodeFields value={codeInput} onChange={onInputChange} isError={isError} disabled={isLoading} />

        {isError && (
          <Message $variant="error" role="alert" $marginBottom $alignCenter>
            {errorMessage}
          </Message>
        )}

        {showGetNewButton ? (
          <Button type="button" onClick={handleGetNewCode}>
            Get new
          </Button>
        ) : (
          <Button type="submit" isLoading={isLoading} disabled={!isFormFilled || isError}>
            Continue
          </Button>
        )}
      </form>
    </ContentWrapper>
  );
};
