import { User } from './../user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UserModule } from './../user/user.module';

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { Config } from 'src/config/config';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { UserSchema } from 'src/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { jwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: Config.jwt.SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  exports: [AuthService, LocalStrategy, UserService, jwtStrategy],
  providers: [AuthService, LocalStrategy, UserService, jwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
