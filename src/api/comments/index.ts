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

  static async getComments(params: Record<string, number | null>) {
    return await instance
      .get<CommentsType[]>(this.endpoint, { params: { _start: 0, _limit: 2, ...params } })
      .then((data) => data.data);
  }

  static async getComment(id: string) {
    return await instance.get<Comments>(`${this.endpoint}/${id}`).then((data) => data.data);
  }
}
export default Comments;
