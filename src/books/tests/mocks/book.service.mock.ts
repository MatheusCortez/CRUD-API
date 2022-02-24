import { booksListmock } from './bookList.mock';

export const bookServiceMock = {
  create: jest.fn((dto) => {
    return {
      ...dto,
    };
  }),
  findAll: jest.fn().mockResolvedValue(booksListmock),
  findOne: jest.fn().mockResolvedValue(booksListmock[0].id),
  update: jest.fn(),
  remove: jest.fn(),
};
