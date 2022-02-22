import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user/user.module';
import { Config } from './config/config';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    MongooseModule.forRoot(Config.database.DB_CONFIG),
    UserModule,
    ServicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
