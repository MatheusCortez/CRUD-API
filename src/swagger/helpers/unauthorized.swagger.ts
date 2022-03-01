import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedErrorSwagger {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
}
