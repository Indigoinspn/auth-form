import { colors, formPadding, formWidth, sizes } from '@/lib/constants';
import styled from 'styled-components';

export const ContentWrapper = styled.div`
  width: ${formWidth};
  padding: ${formPadding};
  background-color: ${colors.white};
  border: 1px solid ${colors.lightGrey};
  border-radius: ${sizes.borderRadius};
`;
