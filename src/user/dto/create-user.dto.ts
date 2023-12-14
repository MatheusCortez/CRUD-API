import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';
export class CreateUserDto {
  id: string;
  @IsNotEmpty({
    message: 'Nome é um campo obrigatorio',
  })
  @ApiProperty({
    required: true,
  })
  name: string;
  @IsNotEmpty({ message: 'Email é um campo obrigatorio' })
  @IsEmail({}, { message: 'Email inserido invalido' })
  @ApiProperty({
    required: true,
  })
  @ApiProperty()
  email: string;
  @IsNotEmpty({
    message: 'CEP é um campo obrigatorio',
  })
  @ApiProperty({
    required: true,
  })
  cep: string;
}
