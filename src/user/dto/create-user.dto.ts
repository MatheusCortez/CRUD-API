import { IsNotEmpty, IsEmail, } from 'class-validator';
export class CreateUserDto {
    id: string;
    @IsNotEmpty({
        message: "Nome é um campo obrigatorio"
    })
    name: string;
    @IsNotEmpty({ message: "Email é um campo obrigatorio" })
    @IsEmail({

    }, { message: "Email inserido invalido" })
    email: string;

    @IsNotEmpty({
        message: "CEP é um campo obrigatorio"
    })
    cep: string;
}
