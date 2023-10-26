import React from 'react';
import { useDebounce } from '../../hooks/debounce';

interface OwnProps {
  value?: string | null;
  onClick?: () => void;
  onChange?: (value: string | null) => void;
  onBlur?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  debounceTime?: number;
  propsMessage?: string;
}

const dataTestId = 'search-input';
const componentName = 'Search input';

export default function SearchInput({
  value,
  onChange,
  onBlur,
  onKeyDown,
  onClick,
  debounceTime = 0,
  propsMessage,
}: OwnProps) {
  const [internalValue, setInternalValue] = React.useState<string>(value ?? '');
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
      setInternalValue(value ?? '');
    }
  }, [value]);
  React.useEffect(() => {
    onChange?.(debouncedValue);
  }, [debouncedValue, handleChange]);
  console.log(`${propsMessage} ${componentName}`);
  return (
    <input
      data-testid={dataTestId}
      value={internalValue}
      onChange={handleChange}
      onClick={onClick}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      placeholder="Search..."
    />
  );
}
