import React, { useCallback } from 'react';
import useCarouselControls from '../hooks/useCarouselControls';
import CarouselIconButton, {
  CarouselIconButtonProps,
} from './CarouselIconButton';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CarouselPlayToggleIconButtonProps
  extends Omit<CarouselIconButtonProps, 'aria-label'> {}

export default function CarouselPlayToggleIconButton(
  props: CarouselPlayToggleIconButtonProps,
) {
  const { isPlaying, togglePlaying } = useCarouselControls();

  return (
    <CarouselIconButton
      aria-label={`${isPlaying ? 'Stop' : 'Start'} slide rotation`}
      // TODO: Use `pause` and `play` icons once they're available
      icon={isPlaying ? 'view-off' : 'view'}
      onClick={useCallback(togglePlaying, [])}
      {...props}
    />
  );
}
