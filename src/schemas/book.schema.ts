import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop()
  id: string;
  @Prop()
  titulo: string;
  @Prop()
  autor: string;
  @Prop()
  genero: string;
  @Prop()
  user: string;
  @Prop()
  anoDeLancamento: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
