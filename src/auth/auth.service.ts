import { Config } from './../config/config';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userservice: UserService,
    private jwtService: JwtService,
  ) {}
  async login(user) {
    const payload = { sub: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload, { secret: Config.jwt.SECRET_KEY }),
    };
  }
  async validateUser(email: string, password: string) {
    let user: User;

    try {
      user = await this.userservice.findOneEmail(email);
      if (!user) return null;
    } catch (error) {
      return null;
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) return null;
    return user;
  }
}
