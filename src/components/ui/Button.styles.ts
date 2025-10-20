import { alignCenter, animation, colors, font, formInnerWidth, sizes } from '@/lib/constants';
import styled, { css } from 'styled-components';

export const StyledButton = styled.button<{ $isLoading: boolean; disabled: boolean }>`
  width: ${formInnerWidth};
  height: 40px;
  border: 1px solid transparent;
  cursor: pointer;
  ${alignCenter};
  transition: opacity ${animation.transition};
  font-size: ${font.size.medium};

  padding: 12px 24px;
  border-radius: ${sizes.borderRadius};

  ${({ $isLoading, disabled }) =>
    !$isLoading && !disabled
      ? css`
          background-color: ${colors.lightBlue};
          border-color: ${colors.lightBlue};
          color: ${colors.white};
          box-shadow: 0px 2px 0px 0px ${colors.semitransparentBlue};
          &: hover {
            background-color: ${colors.darkBlue};
          }
        `
      : css`
          background-color: ${colors.lightGrey};
          border-color: ${colors.grey};
          color: ${colors.darkGrey};
          cursor: not-allowed;
        `};
`;

export const Loader = styled.span`
  width: 25px;
  height: 25px;
  border: 2px solid transparent;
  border-top: 2px solid ${colors.darkGrey};
  border-right: 2px solid ${colors.darkGrey};
  border-bottom: 2px solid ${colors.darkGrey};
  border-radius: 50%;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    to {
      transform: rotate(360deg);
    }
  }
`;
