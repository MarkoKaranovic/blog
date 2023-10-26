import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Api } from '../api';
import { QueriesKeys, QueryKey } from '../constants/QueriesKeys';
import { type PostsType } from '../api/posts';

interface ContextType {
  posts: PostsType[];
  count: number;
  isLoading: boolean;
  onFilterChange: (value: Record<string, string | number | null>) => void;
}

const Context = React.createContext<ContextType>({ posts: [], count: 0, isLoading: false, onFilterChange: () => ({}) });
Context.displayName = 'SearchContext';

export const Provider = React.memo(({ children }: { children: React.ReactNode }) => {
  const [filter, setFilter] = React.useState({});
  const { data, isLoading } = useQuery({
    queryKey: QueriesKeys[QueryKey.POSTS](filter),
    queryFn: async () => await Api.Posts.get(filter),
  });

  const onFilterChange = React.useCallback(
    (value: Record<string, string | number | null>) => {
      console.log(value);
      setFilter((prev) => ({ ...prev, ...(value ? { _start: 0, _end: 10, _page: null } : {}), ...value }));
    },
    [filter],
  );

  const value = React.useMemo(
    () => ({
      posts: data?.data ?? [],
      count: data?.count ?? 0,
      isLoading,
      onFilterChange,
    }),
    [data, isLoading],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
});

export const useSearchResources = () => React.useContext(Context);
