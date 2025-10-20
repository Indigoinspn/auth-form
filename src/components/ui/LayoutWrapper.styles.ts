import styled from 'styled-components';
import { colors, alignCenter } from '@/lib/constants';

export const LayoutWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  ${alignCenter};
  background-color: ${colors.lightGrey};
  padding: 16px;
`;
