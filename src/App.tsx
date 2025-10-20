import { useState } from 'react';
import { LoginPage } from '@/pages/LoginPage';
import { TwoFactorPage } from '@/pages/TwoFactorPage';
import { SuccessPage } from './pages/SuccessPage';

type AuthStep = 'login' | 'two-factor' | 'success';

export interface AuthState {
  email: string;
  token: string;
}

function App() {
  const [step, setStep] = useState<AuthStep>('login');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [authState, setAuthState] = useState<AuthState | null>(null);

  const handleLoginSuccess = (email: string, token: string, requires2fa: boolean) => {
    setAuthState({ email, token });

    if (requires2fa) {
      setStep('two-factor');
    } else {
      setStep('success');
    }
  };

  const handleLogOut = () => {
    setStep('login');
  };

  const handleTwoFactorSuccess = () => {
    setStep('success');
  };

  if (step === 'success') {
    return <SuccessPage onLogOut={handleLogOut} />;
  }

  return (
    <>
      {step === 'login' ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <TwoFactorPage onVerifySuccess={handleTwoFactorSuccess} onBack={() => setStep('login')} />
      )}
    </>
  );
}

export default App;
