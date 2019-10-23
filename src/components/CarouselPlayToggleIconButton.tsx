import React, { useContext } from 'react';
import useCarouselControls from '../hooks/useCarouselControls';
import useFocus from '../hooks/useFocus';
import useHover from '../hooks/useHover';
import CarouselContext from './CarouselContext';
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

  const [
    isContainerFocused,
    isContainerHovered,
    [disableAutoPause, setDisableAutoPause],
  ] = useContext(CarouselContext);
  const [isFocused, bindFocus] = useFocus();
  const [isHovered, bindHover] = useHover();
  const nextDisableAutoPause =
    (isFocused && (!isContainerHovered || isHovered)) ||
    (isHovered && !isContainerFocused);
  if (nextDisableAutoPause !== disableAutoPause) {
    setDisableAutoPause(nextDisableAutoPause);
  }

  return (
    <CarouselIconButton
      aria-label={`${isPlaying ? 'Stop' : 'Start'} slide rotation`}
      // TODO: Use `pause` and `play` icons once they're available
      icon={isPlaying ? 'view-off' : 'view'}
      onClick={togglePlaying}
      {...bindFocus}
      {...bindHover}
      {...props}
    />
  );
}
