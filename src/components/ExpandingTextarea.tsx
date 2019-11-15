import { InputProps, Textarea, useColorMode } from '@chakra-ui/core';
import { css } from '@emotion/core';
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
    if (typeof value === 'string' && value !== ref.current!.textContent) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ref.current!.textContent = value;
    }
  }, [value]);

  const preferDarkMode = useColorMode() === 'dark';

  return (
    <Textarea
      ref={ref}
      as="div"
      onInput={(event: React.FormEvent<HTMLElement>) => {
        if (onInput) onInput(event);
        if (onChange) onChange(event);
      }}
      display={undefined}
      height={undefined}
      minHeight={undefined}
      {...restProps}
      suppressContentEditableWarning
      contentEditable={!isDisabled && !isReadOnly}
      css={
        typeof value === 'string' && value.length === 0
          ? theme =>
              css`
                ::before {
                  /* Source: https://github.com/chakra-ui/chakra-ui/blob/master/packages/chakra-ui/src/CSSReset/index.js */
                  color: ${
                    preferDarkMode
                      ? theme.colors.whiteAlpha[400]
                      : theme.colors.gray[400]
                  };
                  content: '${placeholder}';
                  pointer-events: none;
                }
              `
          : undefined
      }
    />
  );
}
