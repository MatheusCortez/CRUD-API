import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { uuid } from 'uuidv4';

import { User } from './entities/user.entity';
<<<<<<< HEAD

=======
>>>>>>> e4dd067b9cceaa31adf838b2ba5f17a518b68231
import { apiCepService } from '../services/apicep/apicep.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private buscaCepService: apiCepService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { name, cep, email } = createUserDto;
<<<<<<< HEAD
    const userFound = await this.userModel.findOne({ email: email });
    if (!!userFound) throw new BadRequestException('Email já Cadastrado');
    const resultAPI = await this.buscaCepService.search(cep);
=======
    const userFound = await this.userModel.findOne({ email: email }).exec();
    if (!!userFound) throw new BadRequestException('Email já Cadastrado');
    const resultAPI = await this.buscaCepService.search(cep);

>>>>>>> e4dd067b9cceaa31adf838b2ba5f17a518b68231
    const address = resultAPI
      ? {
          code: resultAPI.code,
          state: resultAPI.state,
          city: resultAPI.city,
          district: resultAPI.district,
          address: resultAPI.address,
        }
      : null;

    const user: User = {
      id: uuid(),
      name,
      email,
      address,
    };
<<<<<<< HEAD
=======

>>>>>>> e4dd067b9cceaa31adf838b2ba5f17a518b68231
    return this.userModel.create(user);
  }
  findAll() {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.userModel.findById(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Nenhum usuário encontrado',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const findUser = await this.findOne(id);
    if (!findUser)
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Usuario não encontrado' },
        HttpStatus.NOT_FOUND,
      );

    const { name, cep } = updateUserDto;
    const resultAPI = await this.buscaCepService.search(cep);
    const address = resultAPI
      ? {
          code: resultAPI.code,
          state: resultAPI.state,
          city: resultAPI.city,
          district: resultAPI.district,
          address: resultAPI.address,
        }
      : null;

    return this.userModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        name,
        cep,
        address,
      },
      {
        new: true,
      },
    );
  }

  async remove(id: string) {
    const findUser = await this.findOne(id);
    if (!findUser)
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Usuario não encontrado' },
        HttpStatus.NOT_FOUND,
      );
    return this.userModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
