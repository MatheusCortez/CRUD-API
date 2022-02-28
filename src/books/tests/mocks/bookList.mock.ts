import { Book } from '../../entities/book.entity';

export const booksListmock: Book[] = [
  new Book({
    id: '0eac96be-50ea-498a-853c-aca41c1d1ae0',
    titulo: 'Stalin. História Crítica de Uma Lenda Negra',
    autor: 'Domenico Losurdo',
    user: 'cdd80057-8d86-4bc0-b8ef-928d89eedff0',
    genero: 'Biografia',
    anoDeLancamento: '2010',
  }),
  new Book({
    id: '0eac96be-50ea-498a-853c-aca41c1d1ae0',
    titulo: 'Suicidas',
    autor: 'Rafael Montes',
    user: '85ef0c7d-f950-4e2e-97ce-3a740f7b630e',
    genero: 'Suspense',
    anoDeLancamento: '2012',
  }),
  new Book({
    id: '0eac96be-50ea-498a-853c-aca41c1d1ae0',
    titulo: 'Neuromancer',
    autor: 'James Warhola',
    user: '1395ff77-1806-45ac-91d9-ec45b5256b42',
    genero: 'Cyberpunk',
    anoDeLancamento: '1991',
  }),
  new Book({
    id: '0eac96be-50ea-498a-853c-aca41c1d1ae0',
    titulo: 'O sono e a morte ',
    autor: 'A. J. Kazinski',
    user: '7b6b224e-b290-42bf-9387-a173323ec987',
    genero: 'Suspense',
    anoDeLancamento: '2014',
  }),
];
