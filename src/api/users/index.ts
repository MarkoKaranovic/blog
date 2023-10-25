import instance from '../instance';
export interface UsersType {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

class Users {
  static endpoint = '/users';

  static async getUsers(params: Record<string, string | null>) {
    return await instance.get<UsersType[]>(this.endpoint, { params }).then((data) => data.data);
  }

  static async getUser(id: number) {
    return await instance.get<UsersType>(`${this.endpoint}/${id}`).then((data) => data.data);
  }
}
export default Users;
