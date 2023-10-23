import React from 'react';

export default function SearchInput({ value, onChange }: any) {
  const [internalValue, setInternalValue] = React.useState(value);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value);
      onChange?.(e.target.value);
    },
    [onChange],
  );
  console.log(internalValue);
  return (
    <input
      value={internalValue}
      onChange={handleChange}
      placeholder="Search..."
    />
  );
}
