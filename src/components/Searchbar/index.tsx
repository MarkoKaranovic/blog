import React from 'react';
import SearchInput from '../SearchInput';
import { useQuery } from '@tanstack/react-query';
import { QueriesKeys, QueryKey } from '../../constants/QueriesKeys';

import { BsSearch } from 'react-icons/bs';
import { TiDelete } from 'react-icons/ti';
import { Api } from '../../api';
import { UsersType } from '../../api/users';
import classNames from 'classnames';
import useOutsideClick from '../../hooks/useOutsideClick';

import styles from './Searchbar.module.scss';

const componentName = 'Searchbar';
interface OwnProps {
  onChange: (value: number | null) => void;
  propsMessage: string;
}

export const Searchbar = React.memo(
  ({ onChange, propsMessage }: OwnProps) => {
    const [searchQuery, setSearchQuery] = React.useState<string | null>(null);
    const [selectedSuggestion, selectSuggestion] = React.useState<number | null>(null);
    const [showSuggestions, setShowSuggestions] = React.useState<boolean>(true);

    const ref = React.useRef<HTMLDivElement>();

    const { data: suggestions } = useQuery({
      queryKey: QueriesKeys[QueryKey.SUGGESTIONS](searchQuery),
      queryFn: async () => await Api.Users.get({ name_like: `^${searchQuery}` }),
      enabled: !!searchQuery,
      select: (data: UsersType[]) => data?.map((item) => ({ value: item.id, label: item.name })) ?? [],
    });

    const onSelectSuggestion = React.useCallback(
      ({ value, label }: { value: number; label: string }) => {
        onChange?.(value);
        setSearchQuery(label);
        setShowSuggestions(false);
      },
      [onChange],
    );
    const onClearSearch = () => {
      selectSuggestion(null);
      onChange(null);
      setSearchQuery('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onChange?.(selectedSuggestion ?? -1);
        setShowSuggestions(false);
        return;
      }

      if (e.key === 'ArrowDown') {
        selectSuggestion(suggestions?.[0]?.value ?? null);
        setSearchQuery(suggestions?.[0]?.label ?? null);
      }
      if (e.key === 'ArrowUp') {
        selectSuggestion(suggestions?.[0]?.value ?? null);
        setSearchQuery(suggestions?.[0]?.label ?? null);
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
                  onSelectSuggestion(suggestion);
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

    console.log(`${propsMessage} ${componentName}`);

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
            onChange={setSearchQuery}
            onClick={() => {
              setShowSuggestions(true);
            }}
            onKeyDown={handleKeyDown}
            value={searchQuery}
            debounceTime={380}
            propsMessage={propsMessage}
          />
          <TiDelete onClick={onClearSearch} />
        </div>
        {renderSuggestions()}
      </div>
    );
  },
  (prevProps, currentProps) => prevProps.propsMessage === currentProps.propsMessage,
);

export default Searchbar;
