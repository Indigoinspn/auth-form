import styled from 'styled-components';
import { colors, sizes, font, margin } from '@/lib/constants/styles';

export const CodeInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin: ${margin.medium} 0 ${margin.medium};
`;

export const CodeInput = styled.input<{ $isError?: boolean }>`
  width: 52px;
  height: 60px;
  font-size: ${font.size.large};
  font-weight: ${font.weight.semiBold};
  text-align: center;
  outline: none;
  border: 1px solid ${(props) => (props.$isError ? colors.red : colors.grey)};
  border-radius: ${sizes.borderRadius};

  &:focus {
    border-color: ${(props) => (props.$isError ? colors.red : colors.lightBlue)};
    box-shadow: inset 0px 0px 3px 4px ${(props) => (props.$isError ? colors.semitransparentRed : colors.semitransparentBlue)};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
