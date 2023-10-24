import instance from '../instance';

export interface PostsType {
  userId: number;
  id: number;
  title: string;
  body: string;
}
class Posts {
  static endpoint = '/posts';

  static getPostsList(params: Record<string, string | null>) {
    return instance.get<PostsType[]>(this.endpoint, { params });
  }

  static getPost(id: string) {
    return instance.get<PostsType>(`${this.endpoint}/${id}`);
  }
}
export default Posts;
