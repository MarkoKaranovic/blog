import React from 'react';
import SearchInput from '../SearchInput';
import { useQuery } from '@tanstack/react-query';
import { QueriesKeys, QueryKey } from '../../constants/QueriesKeys';

import { BsSearch } from 'react-icons/bs';
import styles from './styles.module.scss';
import { Api } from '../../api';

type OwnProps = {
  onChange: (value: string) => void;
};

export const Searchbar = React.memo(({ onChange }: OwnProps) => {
  const [searchQuery, setSearchQuery] = React.useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  const { data: suggestions } = useQuery({
    queryKey: QueriesKeys[QueryKey.SUGGESTIONS](searchQuery),
    queryFn: async () => await Api.Users.getUsers({ name_like: `^${searchQuery}` }),
    enabled: !!searchQuery,
    select: (data) => data?.data.map((item: any) => ({ value: item.id, label: item.name })) ?? [],
  });

  const onSelectSuggestion = React.useCallback(
    (value: string) => {
      onChange?.(value);
      setShowSuggestions(false);
    },
    [onChange],
  );

  const renderSuggestions = React.useCallback(() => {
    if (!suggestions?.length || !showSuggestions) {
      return null;
    }
    return (
      <div className={styles.suggestionsWrapper}>
        {suggestions.map((suggestion: { value: string; label: string }) => {
          return (
            <p
              key={suggestion.value}
              onClick={() => onSelectSuggestion(suggestion.value)}
            >
              {suggestion.label}
            </p>
          );
        })}
      </div>
    );
  }, [suggestions, showSuggestions, onSelectSuggestion]);

  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <BsSearch />
        <SearchInput
          onChange={(value: string) => {
            setSearchQuery(value);
            setShowSuggestions(true);
          }}
          // onBlur={() => setShowSuggestions(false)}
        />
      </div>
      {renderSuggestions()}
    </div>
  );
});

export default Searchbar;
