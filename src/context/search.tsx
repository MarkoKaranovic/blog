import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Api } from '../api';
import { QueriesKeys, QueryKey } from '../constants/QueriesKeys';
import { type PostsType } from '../api/posts';

interface ContextType {
  posts: PostsType[];
  isLoading: boolean;
  onFilterChange: (field: string, value: number) => void;
}

const Context = React.createContext<ContextType>({ posts: [], isLoading: false, onFilterChange: () => ({}) });
Context.displayName = 'SearchContext';

export const Provider = React.memo(({ children }: { children: React.ReactNode }) => {
  const [filter, setFilter] = React.useState({});
  const { data, isLoading } = useQuery({
    queryKey: QueriesKeys[QueryKey.POSTS](filter),
    queryFn: async () => await Api.Posts.get(filter),
  });

  const onFilterChange = React.useCallback((field: string, value: number) => {
    setFilter((prev) => ({ ...prev, [field]: value }));
  }, []);

  const value = React.useMemo(
    () => ({
      posts: data ?? [],
      isLoading,
      onFilterChange,
    }),
    [data, isLoading],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
});

export const useSearchResources = () => React.useContext(Context);
