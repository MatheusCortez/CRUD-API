import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user/user.module';
import { Config } from './config/config';
import { ServicesModule } from './services/services.module';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(Config.database.DB_CONFIG),
    UserModule,
    ServicesModule,
    BooksModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [UserModule],
})
export class AppModule {}
