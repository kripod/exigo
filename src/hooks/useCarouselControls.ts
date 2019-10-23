import { useContext } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import CarouselContext from '../components/CarouselContext';
import { mod } from '../utils/math';

// TODO: Follow the status of element scrolling methods and remove polyfill
if (typeof window !== 'undefined') {
  smoothscroll.polyfill();
}

export default function useCarouselControls() {
  const [
    ,
    [activeIndex, setActiveIndex],
    slidesRef,
    isInfinite,
    [isPlaying, setPlaying],
  ] = useContext(CarouselContext);

  function goTo(index: React.SetStateAction<number>) {
    setActiveIndex(prevIndex => {
      const nextIndex = typeof index !== 'function' ? index : index(prevIndex);
      if (nextIndex < 0 || nextIndex >= slidesRef.current.length) {
        return prevIndex;
      }

      const slide = slidesRef.current[nextIndex];
      if (slide.parentElement) {
        slide.parentElement.scroll({
          top: slide.offsetTop,
          left: slide.offsetLeft,
          behavior: 'smooth',
        });
      }
      return nextIndex;
    });
  }

  return {
    isInfinite,

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
      goTo(prevIndex => {
        const sum = prevIndex + delta;
        return isInfinite ? mod(sum, slidesRef.current.length) : sum;
      });
    },
  };
}
