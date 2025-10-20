import { ChangeEvent, FC, KeyboardEvent, ClipboardEvent, useEffect, useRef, FocusEvent } from 'react';
import { CodeInput, CodeInputContainer } from './CodeInput.styles';
import { TWO_FACTOR_CODE_LENGTH } from '@/lib/constants';

export interface CodeFieldsProps {
  value: string[];
  onChange: (code: string[]) => void;
  isError?: boolean;
  disabled?: boolean;
}
export const CodeFields: FC<CodeFieldsProps> = ({ value, onChange, isError = false, disabled = false }) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Accept only numbers
    if (/^\d?$/.test(inputValue)) {
      const newValue = [...value];
      newValue[index] = inputValue;
      onChange(newValue);

      // Autofocus on the next field
      if (inputValue && index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }

    if (e.key === 'Delete' && !value[index] && index < TWO_FACTOR_CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    //Select value on focus
    e.target.select();
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData('text');

    // Get only numbers from buffer data
    const digits = pastedData.match(/\d/g) || [];

    if (digits.length >= TWO_FACTOR_CODE_LENGTH) {
      const newCode = digits.slice(0, TWO_FACTOR_CODE_LENGTH);
      onChange(newCode);

      inputsRef.current[TWO_FACTOR_CODE_LENGTH - 1]?.focus();
    }
  };

  useEffect(() => {
    if (!disabled && !isError) {
      inputsRef.current[0]?.focus();
    }
  }, [disabled, isError]);

  return (
    <CodeInputContainer>
      {value.map((digit, index) => (
        <CodeInput
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="\d{1}"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          disabled={disabled}
          $isError={isError}
          onFocus={handleFocus}
          aria-invalid={isError}
          {...(index === 0 && { onPaste: handlePaste })}
        />
      ))}
    </CodeInputContainer>
  );
};

CodeFields.displayName = 'Code input fields';
