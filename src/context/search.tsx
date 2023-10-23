import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import React from 'react';
import { Api } from '../api';
import { QueriesKeys, QueryKey } from '../constants/QueriesKeys';

const Context = React.createContext<any>({});
Context.displayName = 'SearchContext';

export const Provider = React.memo<any>(({ children }: any) => {
  const [filter, setFilter] = React.useState({ userId: null });
  const { data } = useQuery({
    queryKey: QueriesKeys[QueryKey.POSTS](filter),
    queryFn: async () => await Api.Posts.getPostsList(filter),
  });

  const onFilterChange = (field: string, value: string) => {
    setFilter((prev) => ({ ...prev, [field]: value }));
  };

  const value = React.useMemo(
    () => ({
      posts: data?.data,
      onFilterChange,
    }),
    [data],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
});

export const useSearchResources = () => React.useContext(Context);
