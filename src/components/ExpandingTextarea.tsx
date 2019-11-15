import { InputProps, Textarea, useColorMode } from '@chakra-ui/core';
import { css } from '@emotion/core';
import React, { useEffect, useRef, useState } from 'react';

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
  const [isPlaceholderHidden, setPlaceholderHidden] = useState(false);

  // Use uncontrolled component to avoid caret position reset during user input
  const expectedValue = useRef<string | null>('');
  useEffect(() => {
    if (typeof value === 'string' && value !== expectedValue.current) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ref.current!.textContent = value;
    }
    expectedValue.current = null;
  }, [value]);

  const preferDarkMode = useColorMode() === 'dark';

  return (
    <Textarea
      ref={ref}
      as="div"
      onInput={(event: React.FormEvent<HTMLElement>) => {
        const { textContent } = event.currentTarget;
        expectedValue.current = textContent;
        setPlaceholderHidden(textContent != null && textContent.length > 0);

        if (onInput) onInput(event);
        if (onChange) onChange(event);
      }}
      display={undefined}
      height={undefined}
      minHeight={undefined}
      {...restProps}
      suppressContentEditableWarning
      contentEditable={!isDisabled && !isReadOnly}
      css={theme => css`
        ::before {
          /* Source: https://github.com/chakra-ui/chakra-ui/blob/master/packages/chakra-ui/src/CSSReset/index.js */
          position: absolute;
          color: ${
            preferDarkMode
              ? theme.colors.whiteAlpha[400]
              : theme.colors.gray[400]
          };
          content: '${isPlaceholderHidden ? '' : placeholder}';
          pointer-events: none;
        }
      `}
    />
  );
}
