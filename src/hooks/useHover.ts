import { useState } from 'react';

export default function useHover(mouseOnly = false) {
  const [isHovered, setHovered] = useState(false);

  return [
    isHovered,
    {
      onMouseEnter() {
        setHovered(true);
      },
      onMouseLeave() {
        setHovered(false);
      },

      ...(!mouseOnly && {
        onTouchStart() {
          setHovered(true);
        },
        onTouchEnd() {
          setHovered(false);
        },
      }),
    },
  ] as const;
}
