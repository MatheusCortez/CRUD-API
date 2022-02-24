import { uuid } from 'uuidv4';
import { Book } from '../../entities/book.entity';

export const booksListmock: Book[] = [
  new Book({
    id: '7619719b-8a9d-40d4-9917-0fbf255bbcb8',
    titulo: 'Stalin. História Crítica de Uma Lenda Negra',
    genero: 'Biografia',
    anoDeLancamento: '2010',
  }),
  new Book({
    id: 'a831ec81-7999-4e66-9e4b-e2d0e7e2001f',
    titulo: 'Suicidas',
    autor: 'Rafael Montes',
    genero: 'Suspense',
    anoDeLancamento: '2012',
  }),
  new Book({
    id: 'bd1eee15-3f1a-4a14-ac5e-dd382b5675fa',
    titulo: 'Neuromancer',
    autor: 'James Warhola',
    genero: 'Cyberpunk',
    anoDeLancamento: '1991',
  }),
  new Book({
    id: '9a70f544-5858-4e89-89a0-f1f6349aef90',
    titulo: 'O sono e a morte ',
    autor: 'A. J. Kazinski',
    genero: 'Suspense',
    anoDeLancamento: '2014',
  }),
];
