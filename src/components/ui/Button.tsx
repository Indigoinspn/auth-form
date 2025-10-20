import { ButtonHTMLAttributes } from 'react';
import { StyledButton, Loader } from './Button.styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button = ({ children, isLoading = false, disabled, className = '', ...props }: ButtonProps) => {
  const isDisabled = disabled || isLoading;

  return (
    <StyledButton $isLoading={isLoading} disabled={isDisabled} className={className} {...props}>
      {isLoading ? <Loader role="status" aria-label="Loading" /> : children}
    </StyledButton>
  );
};

Button.displayName = 'Button';
