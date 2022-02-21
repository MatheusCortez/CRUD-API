import { User } from '../../entities/user.entity';
import { uuid } from 'uuidv4';

export const usersList: User[] = [
  new User({
    id: uuid(),
    name: 'Matheus Cortez',
    email: 'matheus.cortez@live.com',
    address: {
      code: '03607060',
      state: 'SP',
      city: 'São Paulo',
      district: 'Vl São Geraldo',
      address: 'Rua Guacari',
    },
  }),
  new User({
    id: uuid(),
    name: 'Tânia Bianca Caroline Pires',
    email: 'taniabiancacarolinepires.taniabiancacarolinepires@uou.com.br',
    address: {
      code: '44089132',
      state: 'BA',
      city: 'Feira de Santana',
      district: 'Brasília',
      address: 'Caminho 25',
    },
  }),
  new User({
    id: uuid(),
    name: 'Laura Bianca Viana',
    email: 'laurabiancaviana-94@proimagem.com',
    address: {
      code: '65911015',
      state: 'MA',
      city: 'Imperatriz',
      district: 'Parque Amazonas',
      address: 'Rua Guajara',
    },
  }),
  new User({
    id: uuid(),
    name: 'Renato Caio Figueiredo',
    email: 'rrenatocaiofigueiredo@dlh.de',
    address: {
      code: '38411597',
      state: 'MG',
      city: 'Uberlândia',
      district: 'Shopping Park',
      address: 'Rua Felipe Bueno Campos',
    },
  }),
];
