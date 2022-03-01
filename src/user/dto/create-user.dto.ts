import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';
export class CreateUserDto {
  id: string;
  @IsNotEmpty({
    message: 'Nome é um campo obrigatorio',
  })
  @ApiProperty()
  name: string;
  @IsNotEmpty({ message: 'Email é um campo obrigatorio' })
  @IsEmail({}, { message: 'Email inserido invalido' })
  @ApiProperty()
  email: string;
  @IsNotEmpty({ message: 'Password é um campo obrigatorio' })
  @ApiProperty()
  password: string;
  @IsNotEmpty({
    message: 'CEP é um campo obrigatorio',
  })
  @ApiPropertyOptional()
  cep: string;
}
