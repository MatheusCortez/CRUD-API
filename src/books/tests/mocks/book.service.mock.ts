import { booksListmock } from './bookList.mock';

export const bookServiceMock = {
  create: jest.fn((dto) => {
    return {
      ...dto,
    };
  }),
  findAll: jest.fn().mockResolvedValue(booksListmock),
  findOne: jest.fn().mockResolvedValue(booksListmock),
  update: jest.fn(),
  remove: jest.fn(),
};
