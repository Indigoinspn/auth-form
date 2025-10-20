import { AuthLayout } from '@/components/auth/AuthLayout';
import { SuccessAuth } from '@/components/auth/SuccessAuth';

interface SuccessPageProps {
  onLogOut: () => void;
}

export const SuccessPage = ({ onLogOut }: SuccessPageProps) => {
  return (
    <AuthLayout>
      <SuccessAuth onLogOut={onLogOut} />
    </AuthLayout>
  );
};
