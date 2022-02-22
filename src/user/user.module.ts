import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchema } from './../schemas/user.schema';
import { User } from './entities/user.entity';
import { ApicepService } from '../services/apicep/apicep.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, ApicepService],
})
export class UserModule {}
