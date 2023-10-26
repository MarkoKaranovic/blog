import React from 'react';

export const useDebounce = <T>(value: T | null, delay = 500): T | null => {
  const [debouncedValue, setDebouncedValue] = React.useState<T | null>(null);

  const timerRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
};
