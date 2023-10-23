import instance from '../instance';

class Posts {
  static endpoint = '/posts';

  static getPostsList(params: any) {
    return instance.get<any>(this.endpoint, { params });
  }

  static getPost(id: string) {
    return instance.get<any>(`${this.endpoint}/${id}`);
  }
}
export default Posts;
