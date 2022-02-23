import { Address } from './../../types/Adress.type';

export class User {
  constructor(User?: Partial<User>) {
    this.id = User.id;
    this.name = User.name;
    this.email = User.email;
    this.address = User.address;
  }
  id: string;
  name: string;
  email: string;
  address?: Address;
}
