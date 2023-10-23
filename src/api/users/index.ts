import instance from '../instance';

class Users {
  static endpoint = '/users';

  static getUsers(params: any) {
    return instance.get<any>(this.endpoint, { params });
  }

  static getUser(id: string) {
    return instance.get<any>(`${this.endpoint}/${id}`);
  }
}
export default Users;
