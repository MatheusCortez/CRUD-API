import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateBookDto {
  id: string;
  @IsNotEmpty({
    message: 'Titulo  é um campo obrigatorio',
  })
  @IsString({ message: ' ' })
  @MinLength(3, { message: 'Titulo deve ser maior que 3 caracteres' })
  titulo: string;
  @IsNotEmpty({
    message: 'Autor  é um campo obrigatorio',
  })
  @IsString({ message: ' ' })
  @MinLength(3, { message: 'Valor minimo de 3 caracteres' })
  @MaxLength(50, { message: 'Valor maximo de até 50 caracteres' })
  autor: string;
  @IsNotEmpty({
    message: 'genero é um campo obrigatorio',
  })
  @MinLength(3, { message: 'Valor minimo de 3 caracteres' })
  genero: string;

  @IsNotEmpty({
    message: 'Ano de Lancamento  é um campo obrigatorio',
  })
  @IsString({ message: '' })
  anoDeLancamento: string;
}
