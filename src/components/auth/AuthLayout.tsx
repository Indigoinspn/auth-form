import { ReactNode } from 'react';
import { LayoutWrapper } from '@/components/ui/LayoutWrapper.styles';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <LayoutWrapper>{children}</LayoutWrapper>;
};
