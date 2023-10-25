import React from 'react';
import { useDebounce } from '../../hooks/debounce';

interface OwnProps {
  value?: string;
  onClick?: () => void;
  onChange?: (value?: string) => void;
  onBlur?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  debounceTime?: number;
}

export default function SearchInput({ value, onChange, onBlur, onKeyDown, onClick, debounceTime = 500 }: OwnProps) {
  const [internalValue, setInternalValue] = React.useState<string | undefined>(value);
  const debouncedValue = useDebounce<string>(internalValue, debounceTime);
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement> & { key: string }) => {
      if (e.key === 'ArrowDown') {
        return;
      }

      setInternalValue(e.target.value);
    },
    [debouncedValue],
  );

  React.useEffect(() => {
    if (value !== internalValue) {
      setInternalValue(value);
    }
  }, [value]);
  React.useEffect(() => {
    onChange?.(debouncedValue);
  }, [debouncedValue, handleChange]);

  return (
    <input
      value={internalValue}
      onChange={handleChange}
      onClick={onClick}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      placeholder="Search..."
    />
  );
}
