import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateUserSwagger {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiPropertyOptional()
  cep: string;
}
