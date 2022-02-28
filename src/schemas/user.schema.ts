import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Address {
  @Prop()
  code: string;
  @Prop()
  state: string;
  @Prop()
  city: string;
  @Prop()
  district: string;
  @Prop()
  address: string;
}

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop({ type: Address })
  address: Address;
}

export const UserSchema = SchemaFactory.createForClass(User);
