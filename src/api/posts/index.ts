import instance from '../instance';

export interface PostsType {
  userId: number;
  id: number;
  title: string;
  body: string;
}
class Posts {
  static endpoint = '/posts';

  static async getPostsList(params: Record<string, string | null>) {
    return await instance.get<PostsType[]>(this.endpoint, { params }).then((data) => data.data);
  }

  static async getPost(id: number) {
    console.log(id);
    return await instance.get<PostsType>(`${this.endpoint}/${id}`).then((data) => data.data);
  }
}
export default Posts;
