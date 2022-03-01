import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Address } from 'src/types/Adress.type';
export class UserSwagger {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiPropertyOptional()
  address: Address;
}
