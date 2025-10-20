import styled from 'styled-components';
import { colors, sizes, animation } from '@/lib/constants/styles';

export const StyledButton = styled.button`
  position: absolute;
  padding: 12px;
  border-radius: ${sizes.borderRadius};
  background-color: transparent;
  transition: background-color ${animation.transition};
  z-index: 2;
  cursor: pointer;

  &:hover {
    background-color: ${colors.lightGrey};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const StyledImage = styled.img`
  width: 14px;
  height: 14px;
`;
