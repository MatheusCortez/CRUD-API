import { uuid } from 'uuidv4';
import { CreateBookDto } from './../dto/create-book.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from '../books.controller';
import { BooksService } from '../books.service';
import { bookServiceMock } from './mocks/book.service.mock';
import { booksListmock } from './mocks/bookList.mock';

describe('BooksController', () => {
  let bookController: BooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    })
      .overrideProvider(BooksService)
      .useValue(bookServiceMock)
      .compile();

    bookController = module.get<BooksController>(BooksController);
  });
  describe('smoke Tests', () => {
    it('should be defined', () => {
      expect(bookController).toBeDefined();
    });
  });

  describe('Book Controller', () => {
    describe('When the authentication is successful', () => {
      describe('Create a book item', () => {
        const bookCreate: CreateBookDto = {
          id: '0eac96be-50ea-498a-853c-aca41c1d1ae0',
          titulo: 'Suicidas',
          autor: 'Rafael Montes',
          genero: 'Suspense',
          anoDeLancamento: '2012',
        };
        describe('When the service called is sucess', () => {
          const idUser = '7b6b224e-b290-42bf-9387-a173323ec987';
          it('Should call the method create with params ', async () => {
            const result = await bookController.create(bookCreate, idUser);
            expect(bookServiceMock.create).toHaveBeenCalledWith(result);
          });
          it('Should a create a book successfully ', async () => {
            const result = await bookController.create(bookCreate, idUser);
            expect(result).toEqual(bookCreate);
          });
          it('Should  call  the method create', async () => {
            expect(bookServiceMock.create).toHaveBeenCalled();
          });
        });
      });
      describe('Get Books', () => {
        const idUser = '7b6b224e-b290-42bf-9387-a173323ec987';
        describe('When called the book list', () => {
          it('Should return array books', async () => {
            const result = await bookController.findAll(idUser);
            expect(result).toEqual(booksListmock);
          });
          it('Should a call the method findAll', async () => {
            expect(bookServiceMock.findAll).toHaveBeenCalled();
          });
        });
        describe('When called the book item ', () => {
          it('Should a get a user with a id param', async () => {
            const result = await bookController.findOne(
              booksListmock[0].id,
              idUser,
            );
            expect(bookServiceMock.findOne).toHaveBeenLastCalledWith(result);
          });
        });
      });
      describe('Update books', () => {
        const idUser = '7b6b224e-b290-42bf-9387-a173323ec987';
        const updateBook = {};
        describe('When  called the method update', () => {
          it('Should call bookServiceMock.update', async () => {
            const result = await bookController.update(
              booksListmock[0].titulo,
              updateBook,
              idUser,
            );
            expect(bookServiceMock.update).toBeCalled();
          });
          it('Should call bookServiceMock.update with result id ', () => {
            expect(bookServiceMock.update).toBeCalledWith(
              booksListmock[0].titulo,
              updateBook,
            );
          });
        });
      });
      describe('Delete a book item', () => {
        const idUser = '7b6b224e-b290-42bf-9387-a173323ec987';
        it('Should call userServiceMock.remove', async () => {
          const result = await bookController.remove(
            booksListmock[0].titulo,
            idUser,
          );
          expect(bookServiceMock.update).toBeCalled();
        });
        it('Should call userServiceMock.remove with result id ', () => {
          expect(bookServiceMock.remove).toBeCalledWith(
            booksListmock[0].id,
            idUser,
          );
        });
      });
    });
  });
});
