import { createContext } from 'react';

const CarouselContext = createContext<
  [number, React.Dispatch<React.SetStateAction<number>>]
>([0, () => {}]);

export default CarouselContext;
