import { ButtonHTMLAttributes } from 'react';
import { StyledButton, StyledImage } from './BackButton.styles';
import arrowUrl from '@/assets/arrow_left.svg';

export const BackButton = ({ onClick, disabled, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <StyledButton type="button" onClick={onClick} disabled={disabled} {...props}>
      <StyledImage src={arrowUrl} alt="Back button" />
    </StyledButton>
  );
};

BackButton.displayName = 'Back arrow button';
