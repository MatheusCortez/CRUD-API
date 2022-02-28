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

@Controller('books')
@UseGuards(AuthGuard('jwt'))
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto, @Req() req: any) {
    return this.booksService.create(createBookDto, req);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.booksService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.booksService.findOne(id, req);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @Req() req: any,
  ) {
    return this.booksService.update(id, updateBookDto, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.booksService.remove(id, req);
  }
}
