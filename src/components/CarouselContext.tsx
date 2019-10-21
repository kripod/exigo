import { createContext } from 'react';

const CarouselContext = createContext<
  [
    [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    [number, React.Dispatch<React.SetStateAction<number>>],
  ]
>([[false, () => {}], [0, () => {}]]);

export default CarouselContext;
