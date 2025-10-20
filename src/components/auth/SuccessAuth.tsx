import { DELAY_DURATION, SUCCESS_AUTH_TITLE } from '@/lib/constants';
import { Button } from '../ui/Button';
import { ContentWrapper } from '../ui/ContentWrapper.styles';
import { useAuth } from '@/hooks/useAuth';
import { HeaderWrapper, StyledHeading } from '../ui/Header.styles';
import { useTwoFactorManager } from '@/hooks/useTwoFactorManager';
import { useState } from 'react';
import { delay } from '@/lib/utils/common/delay';

interface SuccessAuthProps {
  onLogOut: () => void;
}

export const SuccessAuth = ({ onLogOut }: SuccessAuthProps) => {
  const { resetLogin } = useAuth();
  const { resetValidation } = useTwoFactorManager();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogOut = async () => {
    setIsLoggingOut(true);

    await delay(DELAY_DURATION);

    onLogOut();
    resetLogin();
    resetValidation();
    setIsLoggingOut(false);
  };

  return (
    <ContentWrapper>
      <HeaderWrapper>
        <StyledHeading>{SUCCESS_AUTH_TITLE}</StyledHeading>
      </HeaderWrapper>

      <Button type="button" isLoading={isLoggingOut} onClick={handleLogOut} disabled={isLoggingOut}>
        Log out
      </Button>
    </ContentWrapper>
  );
};
