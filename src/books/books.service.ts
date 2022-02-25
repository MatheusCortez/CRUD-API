import { Book } from './entities/book.entity';
import { BookDocument } from 'src/schemas/book.schema';
import { Model } from 'mongoose';
import {
  HttpException,
  Injectable,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from '../auth/auth.service';
@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    private authService: AuthService,
  ) {}
  create(createBookDto: CreateBookDto, req) {
    const user = req.user.id;
    const { titulo, autor, genero, anoDeLancamento } = createBookDto;
    const book: Book = {
      titulo,
      autor,
      genero,
      user,
      anoDeLancamento,
    };
    return this.bookModel.create(book);
  }

  findAll(req) {
    const user = req.user.id;
    return this.bookModel.find({ user: user });
  }

  async findOne(id: string, req) {
    const user = req.user.id;
    try {
      const bookFound = await this.bookModel.findOne({ _id: id, user });
      if (!bookFound) throw new BadRequestException('Livro não cadastrado');
      return bookFound;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Livro não cadastrado',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: string, updateBookDto: UpdateBookDto, req) {
    const user = req.user.id;
    const bookFound = await this.bookModel.findOne({ _id: id, user });
    if (!bookFound) throw new BadRequestException('Livro não cadastrado');
    const { titulo, genero, anoDeLancamento } = updateBookDto;
    return this.bookModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        titulo,
        genero,
        anoDeLancamento,
      },
      {
        new: true,
      },
    );
  }

  async remove(id: string, req) {
    const user = req.user.id;
    const bookFound = await this.bookModel.findOne({ _id: id, user });
    try {
      if (!bookFound) throw new BadRequestException('Livro não localizado');
      return this.bookModel
        .deleteOne({
          _id: id,
          user: user,
        })
        .exec();
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Livro não encontrado' },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
