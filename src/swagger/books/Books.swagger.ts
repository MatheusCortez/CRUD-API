import { ApiProperty } from '@nestjs/swagger';

export class BookSwagger {
  @ApiProperty()
  id: string;
  @ApiProperty()
  titulo: string;
  @ApiProperty()
  autor: string;
  @ApiProperty()
  user: string;
  @ApiProperty()
  genero: string;
  @ApiProperty()
  anoDeLancamento: string;
}
