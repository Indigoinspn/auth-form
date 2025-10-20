import { Logo } from './Logo';
import { HeaderWrapper, StyledHeading, Subtitle } from './Header.styles';

interface TitleProps {
  title: string;
  subtitle?: string;
}

export const Header = ({ title, subtitle }: TitleProps) => {
  return (
    <HeaderWrapper>
      <Logo />
      <StyledHeading>{title}</StyledHeading>
      <Subtitle>{subtitle}</Subtitle>
    </HeaderWrapper>
  );
};

Header.displayName = 'Form header';
