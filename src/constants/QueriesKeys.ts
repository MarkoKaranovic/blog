export enum QueryKey {
  POSTS = 'posts',
  COMMENTS = 'comments',
  USER = 'user',
  SUGGESTIONS = 'suggestions',
}

export const QueriesKeys = {
  [QueryKey.POSTS]: (filter: any) => [QueryKey.POSTS, filter],
  [QueryKey.COMMENTS]: (postId: any) => [QueryKey.COMMENTS, postId],
  // [QueryKey.USERS]: () => [QueryKey.USERS],
  [QueryKey.USER]: (userId: string | null) => [QueryKey.USER, userId],
  [QueryKey.SUGGESTIONS]: (userId: string | null) => [QueryKey.USER, userId],
};
