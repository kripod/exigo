import { useEffect, useState } from 'react';

export default function useChanging<T>(value: T, groupingIntervalMs = 150) {
  const [isChanging, setChanging] = useState(false);

  useEffect(() => {
    setChanging(true);
    const timeoutID = setTimeout(() => setChanging(false), groupingIntervalMs);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [groupingIntervalMs, value]);

  return isChanging;
}
