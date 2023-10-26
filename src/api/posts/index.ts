import instance from '../instance';

export interface PostsType {
  userId: number;
  id: number;
  title: string;
  body: string;
}
class Posts {
  static endpoint = '/posts';

  static async get(params: Record<string, string | null>) {
    return await instance
      .get<PostsType[]>(this.endpoint, { params: { _start: 0, _end: 10, ...params } })
      .then((data) => {
        return { data: data.data, count: data.headers['x-total-count'] };
      });
  }

  static async getById(id: number) {
    return await instance
      .get<PostsType>(`${this.endpoint}/${id}`, {
        params: {
          _expand: 'user',
        },
      })
      .then((data) => data.data);
  }
}
export default Posts;
