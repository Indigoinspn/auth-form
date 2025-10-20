import styled, { css } from 'styled-components';
import { MessageProps } from './Message';
import { colors, font, margin } from '@/lib/constants';

export const StyledMessage = styled.span<MessageProps>`
  display: block;
  font-size: ${font.size.small};
  margin-top: ${({ $marginTop }) => ($marginTop ? margin.small : 0)};
  margin-bottom: ${({ $marginBottom }) => ($marginBottom ? margin.large : 0)};
  white-space: pre-line;

  ${({ $alignCenter }) =>
    $alignCenter
      ? css`
          text-align: center;
        `
      : undefined};

  color: ${(props) => {
    switch (props.$variant) {
      case 'error':
        return colors.red;
      case 'success':
        return colors.green;
      case 'info':
        return colors.lightBlue;
      default:
        return colors.lightBlue;
    }
  }};
`;
