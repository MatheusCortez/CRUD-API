import { IsNotEmpty, IsEmail } from 'class-validator';
export class CreateUserDto {
  id: string;
  @IsNotEmpty({
    message: 'Nome é um campo obrigatorio',
  })
  name: string;
  @IsNotEmpty({ message: 'Email é um campo obrigatorio' })
  @IsEmail({}, { message: 'Email inserido invalido' })
  email: string;
<<<<<<< HEAD
=======

>>>>>>> e4dd067b9cceaa31adf838b2ba5f17a518b68231
  @IsNotEmpty({
    message: 'CEP é um campo obrigatorio',
  })
  cep: string;
}
