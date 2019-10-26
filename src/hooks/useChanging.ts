import { useEffect, useState } from 'react';

export default function useChanging<T>(value: T) {
  const [isChanging, setChanging] = useState(false);

  useEffect(() => {
    setChanging(true);
    const timeoutID = setTimeout(() => setChanging(false), 150);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [value]);

  return isChanging;
}
