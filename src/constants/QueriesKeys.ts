export enum QueryKey {
  POSTS = 'posts',
  COMMENTS = 'comments',
  USER = 'user',
  SUGGESTIONS = 'suggestions',
}

export const QueriesKeys = {
  [QueryKey.POSTS]: (filter?: Record<string, string> | null) => [QueryKey.POSTS, filter],
  [QueryKey.COMMENTS]: (postId: number) => [QueryKey.COMMENTS, postId],
  [QueryKey.USER]: (userId: number) => [QueryKey.USER, userId],
  [QueryKey.SUGGESTIONS]: (userId?: string) => [QueryKey.USER, userId],
};
