import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiPropertyOptional()
  titulo?: string;
  @ApiPropertyOptional()
  genero?: string;
  @ApiPropertyOptional()
  anoDeLancamento?: string;
}
