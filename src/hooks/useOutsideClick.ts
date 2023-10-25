import { useEffect } from 'react';

const useOutsideClick = (
  ref: React.MutableRefObject<Element | undefined> | undefined,
  enable: boolean,
  callback: () => void,
) => {
  const handleClick = (e: MouseEvent) => {
    if (ref?.current && !ref.current?.contains?.(e.target as Node)) {
      callback();
    }
  };
  useEffect(() => {
    enable && document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [enable]);
};

export default useOutsideClick;
