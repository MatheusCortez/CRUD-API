import { usersList } from './../../user/test/mocks/userList.mock';
import { CreateBookDto } from './../dto/create-book.dto';
import { bookServiceMock } from './mocks/book.service.mock';
import { Book, BookSchema, BookDocument } from './../../schemas/book.schema';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { BooksService } from '../books.service';
import { Model } from 'mongoose';
import { booksListmock } from './mocks/bookList.mock';

describe('BooksService', () => {
  let service: BooksService;
  let bookModel: Model<BookDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService],
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
      .overrideProvider(BooksService)
      .useValue(bookServiceMock)
      .compile();

    service = module.get<BooksService>(BooksService);
    bookModel = module.get<Model<BookDocument>>(getModelToken(Book.name));
  });
  afterEach(async () => {
    await bookModel.deleteMany({});
    jest.clearAllMocks();
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Book Service ', () => {
    const createBook: CreateBookDto = {
      id: '0eac96be-50ea-498a-853c-aca41c1d1ae0',
      titulo: 'Suicidas',
      autor: 'Rafael Montes',
      genero: 'Suspense',
      anoDeLancamento: '2012',
    };
    describe('When a creating book sucess', () => {
      it('Should an user creating sucess', async () => {
        const book = await bookServiceMock.create(createBook);
        const resultFind = bookModel.findOne({ titulo: book.titulo });
      });
    });
    describe('Get Books', () => {
      describe('When fetching a book list,', () => {
        describe('when the user is not authorized', () => {
          const book = booksListmock[0];
          const req = booksListmock[0].user;
          it('should a error message ', () => {
            const result = bookServiceMock.findAll(req);
          });
        });
      });
    });
  });
});
