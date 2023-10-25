import React from 'react';
import SearchInput from '../SearchInput';
import { useQuery } from '@tanstack/react-query';
import { QueriesKeys, QueryKey } from '../../constants/QueriesKeys';

import { BsSearch } from 'react-icons/bs';
import styles from './styles.module.scss';
import { Api } from '../../api';
import { UsersType } from '../../api/users';
import classNames from 'classnames';
import useOutsideClick from '../../hooks/useOutsideClick';

interface OwnProps {
  onChange: (value: number) => void;
}

export const Searchbar = React.memo(({ onChange }: OwnProps) => {
  const [searchQuery, setSearchQuery] = React.useState<string | undefined>(undefined);
  const [selectedSuggestion, selectSuggestion] = React.useState<number | undefined>(undefined);
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  const ref = React.useRef<HTMLDivElement>();

  const { data: suggestions } = useQuery({
    queryKey: QueriesKeys[QueryKey.SUGGESTIONS](searchQuery),
    queryFn: async () => await Api.Users.getUsers({ name_like: `^${searchQuery}` }),
    enabled: !!searchQuery,
    select: (data: UsersType[]) => data?.map((item) => ({ value: item.id, label: item.name })) ?? [],
  });

  const onSelectSuggestion = React.useCallback(
    (value: number) => {
      onChange?.(value);
      setShowSuggestions(false);
    },
    [onChange],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onChange?.(selectedSuggestion ?? -1);
      setShowSuggestions(false);
      return;
    }

    if (e.key === 'ArrowDown') {
      selectSuggestion(suggestions?.[0].value);
      setSearchQuery(suggestions?.[0].label);
    }
    if (e.key === 'ArrowUp') {
      selectSuggestion(suggestions?.[0].value);
      setSearchQuery(suggestions?.[0].label);
    }
  };

  const renderSuggestions = React.useCallback(() => {
    if (!suggestions?.length || !showSuggestions) {
      return null;
    }
    return (
      <div className={styles.suggestionsWrapper}>
        {suggestions?.map((suggestion: { value: number; label: string }) => {
          return (
            <p
              key={suggestion.value}
              className={classNames({ [styles.active]: selectedSuggestion === suggestion.value })}
              onClick={() => {
                onSelectSuggestion(suggestion.value);
              }}
            >
              {suggestion.label}
            </p>
          );
        })}
      </div>
    );
  }, [suggestions, showSuggestions, onSelectSuggestion]);

  useOutsideClick(ref, showSuggestions, () => {
    setShowSuggestions(false);
  });
  return (
    <div
      ref={ref as React.LegacyRef<HTMLDivElement>}
      className={styles.container}
    >
      <div className={styles.searchWrapper}>
        <BsSearch
          onClick={() => {
            onChange(selectedSuggestion ?? suggestions?.[0]?.value ?? -1);
          }}
        />
        <SearchInput
          onChange={(value?: string) => {
            setSearchQuery(value);
            setShowSuggestions(true);
          }}
          onClick={() => {
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          value={searchQuery}
          debounceTime={380}
        />
      </div>
      {renderSuggestions()}
    </div>
  );
});

export default Searchbar;
