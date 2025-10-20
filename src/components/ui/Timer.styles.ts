import styled from 'styled-components';
import { colors, font } from '@/lib/constants/styles';

export const TimerWrapper = styled.div`
  margin: 5px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export const StyledText = styled.span`
  display: block;
  font-size: ${font.size.default};
  color: ${colors.darkGrey};
`;

export const Counter = styled.span`
  display: block;
  font-size: ${font.size.default};
  color: ${colors.darkGrey};
  width: 24px;
  text-align: center;
`;
