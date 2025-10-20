import { alignCenter, colors, font, formInnerWidth, margin } from '@/lib/constants';
import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  position: relative;
  width: ${formInnerWidth};
  height: auto;
  ${alignCenter};
  flex-direction: column;
  margin-bottom: ${margin.large};
`;

export const StyledHeading = styled.h3`
  line-height: 1.3;
  font-size: ${font.size.large};
  font-weight: ${font.weight.semiBold};
  text-align: center;
  color: ${colors.black};
  margin-bottom: ${margin.default};
`;

export const Subtitle = styled.p`
  font-size: ${font.size.medium};
  color: ${colors.black};
  text-align: center;
  margin: 0;
`;
