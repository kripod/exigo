import { InputProps, Textarea } from '@chakra-ui/core';
import React, { useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ExpandingTextareaProps extends InputProps {}

export default function ExpandingTextarea({
  value,
  placeholder,
  onChange,
  onInput,
  ...restProps
}: ExpandingTextareaProps) {
  const { isDisabled, isReadOnly } = restProps;
  const ref = useRef<HTMLTextAreaElement>(null);

  // Use uncontrolled component to avoid caret position reset during user input
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (typeof value === 'string' && ref.current!.innerText !== value) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ref.current!.innerText = value;
    }
  }, [value]);

  return (
    <Textarea
      ref={ref}
      onInput={(event: React.FormEvent<HTMLInputElement>) => {
        if (onInput) onInput(event);
        if (onChange) onChange(event);
      }}
      display={undefined}
      height={undefined}
      minHeight={undefined}
      {...restProps}
      suppressContentEditableWarning
      contentEditable={!isDisabled && !isReadOnly}
    />
  );
}
