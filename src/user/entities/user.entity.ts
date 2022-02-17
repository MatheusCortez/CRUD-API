import { Address } from './../../types/Adress.type';

export class User {
    id: string
    name: string;
    email: string;
    address?: Address;
}