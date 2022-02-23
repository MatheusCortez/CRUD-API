import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchema } from './../schemas/user.schema';
import { User } from './entities/user.entity';
<<<<<<< HEAD
import { apiCepService } from '../services/apicep/apicep.service';
=======
import { ApicepService } from '../services/apicep/apicep.service';
>>>>>>> e4dd067b9cceaa31adf838b2ba5f17a518b68231

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
<<<<<<< HEAD
  providers: [UserService, apiCepService],
=======
  providers: [UserService, ApicepService],
>>>>>>> e4dd067b9cceaa31adf838b2ba5f17a518b68231
})
export class UserModule {}
