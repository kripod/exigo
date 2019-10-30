import React from 'react';
import useCarouselControls from '../hooks/useCarouselControls';
import CarouselIconButton, {
  CarouselIconButtonProps,
} from './CarouselIconButton';

export interface CarouselStepIconButtonProps extends CarouselIconButtonProps {
  delta: number;
}

export default function CarouselStepIconButton({
  delta,
  ...restProps
}: CarouselStepIconButtonProps) {
  const { shownIndex, setTargetIndex, totalCount } = useCarouselControls();
  const nextIndex = shownIndex + delta;

  return (
    <CarouselIconButton
      // TODO: Add support for unidirectional behavior (disable at each end)
      onClick={() => {
        setTargetIndex((nextIndex + totalCount) % totalCount);
      }}
      {...restProps}
    />
  );
}
