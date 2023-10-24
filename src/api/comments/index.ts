import instance from '../instance';
export interface CommentsType {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

class Comments {
  static endpoint = '/comments';

  static getComments(params: Record<string, number | null>) {
    return instance.get<CommentsType[]>(this.endpoint, { params: { _start: 0, _limit: 2, ...params } });
  }

  static getComment(id: string) {
    return instance.get<Comments>(`${this.endpoint}/${id}`);
  }
}
export default Comments;
