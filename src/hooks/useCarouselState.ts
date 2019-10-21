import { useContext } from 'react';
import CarouselContext from '../components/CarouselContext';

export default function useCarouselState() {
  return useContext(CarouselContext);
}
