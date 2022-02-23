import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Address {
  @Prop()
  code: string;
<<<<<<< HEAD
  @Prop()
  state: string;
=======

  @Prop()
  state: string;

>>>>>>> e4dd067b9cceaa31adf838b2ba5f17a518b68231
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
  @Prop({ type: Address })
  address: Address;
}

export const UserSchema = SchemaFactory.createForClass(User);
