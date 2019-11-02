import React from 'react';

const CarouselContext = React.createContext<
  [
    [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    [number, React.Dispatch<React.SetStateAction<number>>],
    [number, React.Dispatch<React.SetStateAction<number>>],
    [number, React.Dispatch<React.SetStateAction<number>>],
    [boolean, React.Dispatch<React.SetStateAction<boolean>>],
  ]
>([
  /* isHovered: */ [false, () => {}],
  /* isFocused: */ [false, () => {}],
  /* [disableAutoPause, setDisableAutoPause]: */ [false, () => {}],
  /* [shownIndex, setShownIndex]: */ [0, () => {}],
  /* [targetIndex, setTargetIndex]: */ [0, () => {}],
  /* [totalCount, setTotalCount]: */ [1, () => {}],
  /* [isPlaying, setPlaying]: */ [false, () => {}],
]);

export default CarouselContext;
