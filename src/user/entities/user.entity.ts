import { Address } from './../../types/Adress.type';

export class User {
<<<<<<< HEAD
  constructor(User?: Partial<User>) {
    this.id = User.id;
    this.name = User.name;
    this.email = User.email;
    this.address = User.address;
  }
=======
>>>>>>> e4dd067b9cceaa31adf838b2ba5f17a518b68231
  id: string;
  name: string;
  email: string;
  address?: Address;
}
