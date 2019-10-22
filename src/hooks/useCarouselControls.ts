import { useContext } from 'react';
import CarouselContext from '../components/CarouselContext';
import { mod } from '../utils/math';

export default function useCarouselControls() {
  const [
    infinite,
    [isPlaying, setPlaying],
    [activeIndex, setActiveIndex],
    slidesRef,
  ] = useContext(CarouselContext);

  function goTo(index: React.SetStateAction<number>) {
    setActiveIndex(prevActiveIndex => {
      const nextActiveIndex =
        typeof index !== 'function' ? index : index(prevActiveIndex);
      if (nextActiveIndex < 0 || nextActiveIndex >= slidesRef.current.length)
        return prevActiveIndex;

      const slide = slidesRef.current[nextActiveIndex];
      if (slide.parentElement) {
        // TODO: Smooth scrolling polyfill
        slide.parentElement.scrollTop =
          slide.offsetTop - slide.parentElement.offsetTop;
        slide.parentElement.scrollLeft =
          slide.offsetLeft - slide.parentElement.offsetLeft;
      }
      return nextActiveIndex;
    });
  }

  return {
    isPlaying,
    togglePlaying() {
      setPlaying(prevIsPlaying => !prevIsPlaying);
    },

    activeIndex,
    getTotalCount() {
      return slidesRef.current.length;
    },
    goTo,
    jump(delta: number) {
      goTo(prevActiveIndex => {
        const sum = prevActiveIndex + delta;
        return infinite ? mod(sum, slidesRef.current.length) : sum;
      });
    },
  };
}
