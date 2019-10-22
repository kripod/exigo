import { useState } from 'react';

export default function useFocus() {
  const [isFocused, setFocused] = useState(false);

  return [
    isFocused,
    {
      onFocus() {
        setFocused(true);
      },
      onBlur() {
        setFocused(false);
      },
    },
  ] as const;
}
