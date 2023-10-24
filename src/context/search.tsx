import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Api } from '../api';
import { QueriesKeys, QueryKey } from '../constants/QueriesKeys';
import { PostsType } from '../api/posts';

type ContextType = {
  posts: PostsType[];
  isLoading: boolean;
  onFilterChange: (field: string, value: string) => void;
};

const Context = React.createContext<ContextType>({ posts: [], isLoading: false, onFilterChange: () => ({}) });
Context.displayName = 'SearchContext';

export const Provider = React.memo<any>(({ children }: { children: React.ReactNode }) => {
  const [filter, setFilter] = React.useState({});
  const { data, isLoading } = useQuery({
    queryKey: QueriesKeys[QueryKey.POSTS](filter),
    queryFn: async () => await Api.Posts.getPostsList(filter),
  });

  const onFilterChange = (field: string, value: string) => {
    setFilter((prev) => ({ ...prev, [field]: value }));
  };

  const value = React.useMemo(
    () => ({
      posts: data?.data ?? [],
      isLoading,
      onFilterChange,
    }),
    [data, isLoading],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
});

export const useSearchResources = () => React.useContext(Context);
