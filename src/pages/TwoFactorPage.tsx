import { FC } from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { TwoFactorForm } from '@/components/auth/TwoFactorForm';

interface TwoFactorPageProps {
  onVerifySuccess: () => void;
  onBack: () => void;
}

export const TwoFactorPage: FC<TwoFactorPageProps> = ({ onVerifySuccess, onBack }) => {
  return (
    <AuthLayout>
      <TwoFactorForm onVerifySuccess={onVerifySuccess} onBack={onBack} />
    </AuthLayout>
  );
};
