import { createContext } from 'react';

const CarouselContext = createContext<
  [
    boolean,
    [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    [number, React.Dispatch<React.SetStateAction<number>>],
    [HTMLElement[], React.Dispatch<React.SetStateAction<HTMLElement[]>>],
    [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    boolean,
  ]
>([
  false,
  [false, () => {}],
  [0, () => {}],
  [[], () => {}],
  [false, () => {}],
  false,
]);

export default CarouselContext;
