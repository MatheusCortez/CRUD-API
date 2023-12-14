import { Address } from './Adress.type';

export interface IUserResponse {
  name: string;
  email: string;
  address: Address;
  _id: string;
  __v?: number;
}
