import { ReactNode } from 'react';
import { StyledMessage } from './Message.styles';

export interface MessageProps {
  children: ReactNode;
  $variant?: 'error' | 'success' | 'info';
  role?: 'alert' | 'status';
  $marginTop?: boolean;
  $marginBottom?: boolean;
  $alignCenter?: boolean;
}

export const Message = ({
  children,
  $variant = 'error',
  role = 'alert',
  $marginTop = false,
  $marginBottom = false,
  $alignCenter = false,
}: MessageProps) => {
  return (
    <StyledMessage
      $variant={$variant}
      role={role}
      aria-live={role === 'alert' ? 'assertive' : 'polite'}
      $marginTop={$marginTop}
      $marginBottom={$marginBottom}
      $alignCenter={$alignCenter}
    >
      {children}
    </StyledMessage>
  );
};
