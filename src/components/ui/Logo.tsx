import { StyledImage, StyledLink } from './Logo.styles';
import logoUrl from '@/assets/company_logo.svg';

export const Logo = () => {
  return (
    <StyledLink href="/home" aria-label="Go to homepage">
      <StyledImage src={logoUrl} alt="Company Logo" />
    </StyledLink>
  );
};

Logo.displayName = 'Company Logo';
