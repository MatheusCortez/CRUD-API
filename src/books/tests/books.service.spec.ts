import { uuid } from 'uuidv4';
import { CreateBookDto } from './../dto/create-book.dto';
import { Book, BookSchema, BookDocument } from './../../schemas/book.schema';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { BooksService } from '../books.service';
import { Model } from 'mongoose';
import { AuthService } from '../../auth/auth.service';
import { authServiceMock } from './mocks/auth.service.mock';
import { BadRequestException } from '@nestjs/common';

describe('BooksService', () => {
  let bookservice: BooksService;
  let bookModel: Model<BookDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService, AuthService],
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            const inMemoryMongoServer = new MongoMemoryServer();
            await inMemoryMongoServer.start();
            const uri = inMemoryMongoServer.getUri();
            return {
              uri: uri,
            };
          },
        }),
        MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
      ],
    })
      .overrideProvider(AuthService)
      .useValue(authServiceMock)
      .compile();

    bookservice = module.get<BooksService>(BooksService);
    bookModel = module.get<Model<BookDocument>>(getModelToken(Book.name));
  });
  afterEach(async () => {
    await bookModel.deleteMany({});
    jest.clearAllMocks();
  });
  it('Smoke Tests', () => {
    expect(bookservice).toBeDefined();
    expect(bookModel).toBeDefined();
  });

  describe('Book Service', () => {
    describe('When creating a book ', () => {
      const req = { user: { id: uuid() } };
      const createBook: CreateBookDto = {
        id: uuid(),
        titulo: 'Neuromancer',
        autor: 'James Warhola',
        genero: 'Cyberpunk',
        anoDeLancamento: '1991',
      };
      describe('When the user is Unauthorized ', () => {
        it('should  has the error return', async () => {
          const book = async () => await bookservice.create(createBook, req);
          expect(book).rejects.toEqual(new BadRequestException('Unauthorized'));
        });
      });
      describe('When user is Authorized', () => {
        it('Should return a book with user id', async () => {
          const book = await bookservice.create(createBook, req);
          const user = req.user.id;
          const resultBook = await bookModel.findOne({
            _id: createBook.id,
            user,
          });
          console.log(resultBook);
        });
      });
    });
  });
});
