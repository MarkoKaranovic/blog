export enum QueryKey {
  POSTS = 'posts',
  POST = 'post',
  COMMENTS = 'comments',
  USER = 'user',
  SUGGESTIONS = 'suggestions',
}

export const QueriesKeys = {
  [QueryKey.POSTS]: (filter?: Record<string, string> | null) => [QueryKey.POSTS, filter],
  [QueryKey.POST]: (postId: number) => [QueryKey.POSTS, postId],
  [QueryKey.COMMENTS]: (postId: number) => [QueryKey.COMMENTS, postId],
  [QueryKey.USER]: (userId: number) => [QueryKey.USER, userId],
  [QueryKey.SUGGESTIONS]: (userId: string | null) => [QueryKey.USER, userId],
};
