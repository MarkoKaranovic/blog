import React from 'react';

type OwnProps = {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
};

export default function SearchInput({ value, onChange, onBlur }: OwnProps) {
  const [internalValue, setInternalValue] = React.useState(value);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value);
      onChange?.(e.target.value);
    },
    [onChange],
  );

  return (
    <input
      value={internalValue}
      onChange={handleChange}
      onBlur={onBlur}
      placeholder="Search..."
    />
  );
}
