import { Config } from './config/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ServicesModule } from './services/services.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(Config.DataBase.DB_CONFIG),
    UserModule, ServicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
