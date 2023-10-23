import React from 'react';
import SearchInput from '../SearchInput';
import { useQuery } from '@tanstack/react-query';
import { QueriesKeys, QueryKey } from '../../constants/QueriesKeys';
import { Api } from '../../api';

import { BsSearch } from 'react-icons/bs';
import styles from './styles.module.scss';

export default function Searchbar({ onChange, suggestionField, resource }: any) {
  const [searchQuery, setSearchQuery] = React.useState(null);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  // const [_searchBarValue, setSearchbarValue] = React.useState<string | null>(null);

  const { data: suggestions } = useQuery({
    queryKey: QueriesKeys[QueryKey.SUGGESTIONS](searchQuery),
    queryFn: async () => await resource({ [suggestionField]: `^${searchQuery}` }),
    enabled: !!searchQuery,
  });

  const onSelectSuggestion = React.useCallback(
    (value: string) => {
      // setSearchbarValue(value);
      onChange?.(value);
      setShowSuggestions(false);
    },
    [onChange],
  );

  const renderSuggestions = React.useCallback(() => {
    if (!suggestions || !showSuggestions) {
      return null;
    }
    return (
      <div className={styles.suggestionsWrapper}>
        {suggestions.data?.map((suggestion: any) => {
          return (
            <p
              key={suggestion.id}
              onClick={() => onSelectSuggestion(suggestion.id)}
            >
              {suggestion.name}
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
          onChange={(value: any) => {
            setSearchQuery(value);
            setShowSuggestions(true);
          }}
        />
      </div>
      {renderSuggestions()}
    </div>
  );
}
