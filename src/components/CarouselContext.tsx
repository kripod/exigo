import { createContext } from 'react';

const CarouselContext = createContext<
  [
    React.MutableRefObject<boolean>,
    boolean,
    [number, React.Dispatch<React.SetStateAction<number>>],
    [HTMLElement[], React.Dispatch<React.SetStateAction<HTMLElement[]>>],
    [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    boolean,
  ]
>([
  { current: false },
  false,
  [0, () => {}],
  [[], () => {}],
  [false, () => {}],
  false,
]);

export default CarouselContext;
