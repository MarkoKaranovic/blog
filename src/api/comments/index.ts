import instance from '../instance';

class Comments {
  static endpoint = '/comments';

  static getComments(params: any) {
    return instance.get<any>(this.endpoint, { params: { _start: 0, _limit: 2, ...params } });
  }

  static getComment(id: string) {
    return instance.get<any>(`${this.endpoint}/${id}`);
  }
}
export default Comments;
