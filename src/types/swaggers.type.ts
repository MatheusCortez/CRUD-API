import { ApiProperty } from '@nestjs/swagger';

class Address {
  @ApiProperty()
  code: string;
  @ApiProperty()
  state: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  district: string;
  @ApiProperty()
  address: string;
}

export class UserSwaggerResponse {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  address: Address;
  @ApiProperty()
  _id: string;
  __v?: number;
}
