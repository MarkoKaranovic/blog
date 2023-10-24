export enum QueryKey {
  POSTS = 'posts',
  COMMENTS = 'comments',
  USER = 'user',
  SUGGESTIONS = 'suggestions',
}

export const QueriesKeys = {
  [QueryKey.POSTS]: (filter: Record<string, string> | null) => [QueryKey.POSTS, filter],
  [QueryKey.COMMENTS]: (postId: number) => [QueryKey.COMMENTS, postId],
  // [QueryKey.USERS]: () => [QueryKey.USERS],
  [QueryKey.USER]: (userId: number | null) => [QueryKey.USER, userId],
  [QueryKey.SUGGESTIONS]: (userId: string | null) => [QueryKey.USER, userId],
};
