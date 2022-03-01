import { ApiProperty } from '@nestjs/swagger';
export class CreateBookSwagger {
  @ApiProperty({ minLength: 3 })
  titulo: string;
  @ApiProperty({ minLength: 3, maxLength: 50 })
  autor: string;
  @ApiProperty({ minLength: 3 })
  genero: string;
  anoDeLancamento: string;
}
