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

  static getUsers(params: Record<string, string | null>) {
    return instance.get<UsersType[]>(this.endpoint, { params });
  }

  static getUser(id: number) {
    return instance.get<UsersType>(`${this.endpoint}/${id}`);
  }
}
export default Users;
