import { alignCenter, formInnerWidth, margin } from '@/lib/constants';
import styled from 'styled-components';

export const StyledLink = styled.a`
  width: ${formInnerWidth};
  height: 64px;
  ${alignCenter};
  margin-bottom: ${margin.default};
  z-index: 1;
`;

export const StyledImage = styled.img`
  width: 98px;
  height: 24px;
`;
