import { animation, colors, font, margin, sizes } from '@/lib/constants';
import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-bottom: ${margin.medium};
`;

export const InputWrapper = styled.div<{ $hasIcon: boolean; $error?: string }>`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${({ $hasIcon }) => ($hasIcon ? '0 12px 0 34px' : '0 12px')};
  background: ${colors.white};
  border-radius: ${sizes.borderRadius};
  border: 1px solid ${colors.grey};
  transition: border-color ${animation.transition};

  ${(props) =>
    props.$error
      ? css`
          border-color: ${colors.red};
          box-shadow: 0px 0px 0px 2px ${colors.semitransparentRed};
        `
      : css`
          &:focus-within {
            border-color: ${colors.lightBlue};
            box-shadow: 0px 0px 0px 2px ${colors.semitransparentBlue};
          }
        `}
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 44px;
  border: none;
  outline: none;
  font-size: ${font.size.medium};
  background: transparent;

  &::placeholder {
    color: ${colors.darkGrey};
  }

  &:focus {
    outline: none;
  }
`;

export const Icon = styled.img`
  width: 16px;
  height: 16px;
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;
