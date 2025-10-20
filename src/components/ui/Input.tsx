import { forwardRef, InputHTMLAttributes } from 'react';
import { Message } from './Message';
import { Icon, InputWrapper, StyledInput, Wrapper } from './Input.styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: string;
  imageAltText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ id, type, icon, error, imageAltText, ...rest }, ref) => {
  return (
    <Wrapper>
      <InputWrapper id={id || type || ''} $hasIcon={!!icon} $error={error}>
        {icon && <Icon src={icon} alt={imageAltText} aria-hidden="true" />}
        <StyledInput ref={ref} aria-invalid={!!error} {...rest} />
      </InputWrapper>

      {error && (
        <Message $variant="error" role="alert" $marginTop>
          {error}
        </Message>
      )}
    </Wrapper>
  );
});

Input.displayName = 'Input field';
