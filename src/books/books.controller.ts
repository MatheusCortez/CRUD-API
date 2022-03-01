import { UnauthorizedErrorSwagger } from './../swagger/helpers/unauthorized.swagger';
import { BookSwagger } from './../swagger/books/Books.swagger';
import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from 'src/swagger/helpers/error.swagger';

@Controller('books')
@ApiTags('Books')
@UseGuards(AuthGuard('jwt'))
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedErrorSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request error',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 201,
    description: 'Create a book Sucess',
    type: BookSwagger,
  })
  @ApiOperation({ summary: 'Create a new book' })
  create(@Body() createBookDto: CreateBookDto, @Req() req: any) {
    return this.booksService.create(createBookDto, req);
  }

  @Get()
  @ApiOperation({ summary: 'Return the array of book' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedErrorSwagger,
  })
  @ApiResponse({
    status: 200,
    description: 'Sucess',
    type: BookSwagger,
    isArray: true,
  })
  findAll(@Req() req: any) {
    return this.booksService.findAll(req);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return a  book item ' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedErrorSwagger,
  })
  @ApiResponse({
    status: 200,
    description: 'Sucess',
    type: BookSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Book not Found',
    type: UnauthorizedErrorSwagger,
  })
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.booksService.findOne(id, req);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updated  a  book' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedErrorSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Book not Found',
    type: UnauthorizedErrorSwagger,
  })
  @ApiResponse({
    status: 200,
    description: 'Updated Book',
    type: BookSwagger,
  })
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @Req() req: any,
  ) {
    return this.booksService.update(id, updateBookDto, req);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete   a  book' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedErrorSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Book not Found',
    type: UnauthorizedErrorSwagger,
  })
  @ApiResponse({
    status: 200,
    description: 'Book successfully deleted ',
  })
  remove(@Param('id') id: string, @Req() req: any) {
    return this.booksService.remove(id, req);
  }
}
