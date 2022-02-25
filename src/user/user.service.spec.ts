import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';

import { MongoMemoryServer } from 'mongodb-memory-server';
import { uuid } from 'uuidv4';
import { Model } from 'mongoose';
import { apiCepService } from '../services/apicep/apicep.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UserDocument, UserSchema } from '../schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

const mockApiService = {
  search: jest.fn(),
};
describe('User  Service', () => {
  let usersService: UserService;
  let userModel: Model<UserDocument>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => {
            const inMemoryMongoServer = new MongoMemoryServer();
            await inMemoryMongoServer.start();
            const uri = inMemoryMongoServer.getUri();
            return {
              uri: uri,
            };
          },
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [apiCepService, UserService],
    })
      .overrideProvider(apiCepService)
      .useValue(mockApiService)
      .compile();

    usersService = module.get<UserService>(UserService);
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
  });
  afterEach(async () => {
    await userModel.deleteMany({});
    jest.clearAllMocks();
  });
  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(userModel).toBeDefined();
  });
  describe('Create User', () => {
    const createDTO: CreateUserDto = {
      id: uuid(),
      name: 'Matheus Cortez',
      email: 'Matheus.cortez@live.com',
      password: '1234',
      cep: '03607060',
    };
    describe('User creating sucesss', () => {
      it('Should an user creating sucess', async () => {
        const user = await usersService.create(createDTO);
        mockApiService.search = jest.fn(() =>
          Promise.resolve({
            data: {
              code: '03607060',
              state: 'SP',
              city: 'São Paulo',
              district: 'Vila São Geraldo',
              address: 'Rua',
            },
          }),
        );
        const { data } = await mockApiService.search();
        user.address = data;
        const resultData = await userModel.findOne({ email: createDTO.email });
        expect(resultData).not.toBeNull();
      });
    });
    describe('When creating an user email already exist', () => {
      it('Should a bad request exception', async () => {
        const createdUser = await userModel.create(createDTO);
        const resultAPI = await mockApiService.search();
        const result = async () => await usersService.create(createDTO);
        expect(result).rejects.toEqual(
          new BadRequestException('Email já Cadastrado'),
        );
      });
    });

    describe('When creating an user and API Service throws an error', () => {
      const user: CreateUserDto = {
        id: uuid(),
        name: 'Matheus Cortez',
        email: 'Matheus.cortez@live.com',
        password: '1234',
        cep: '',
      };
      it('Should create an user and passing a invalid or not found CEP', async () => {
        const result = await usersService.create(user);
        mockApiService.search = jest.fn(() =>
          Promise.resolve({
            data: null,
          }),
        );
        const { data } = await mockApiService.search();
        result.address = data;
        expect(result.address).toBeNull();
      });
    });
  });
  describe('Get User', () => {
    describe('when  fetching the user list', () => {
      it('should return a UsersList sucessfully', async () => {
        const result = await usersService.findAll();
        expect(result).not.toEqual(null);
      });
    });
    describe('when  fetching the user item', () => {
      const createDTO: CreateUserDto = {
        id: uuid(),
        name: 'Matheus Cortez',
        password: '1234',
        email: 'Matheus.cortez@live.com',
        cep: '03607060',
      };

      it('should the user item searching by id ', async () => {
        const user = await userModel.create(createDTO);
        const result = await usersService.findOne(user.id);
        expect(result).not.toBe(null);
      });
    });
    describe('when we search for a user that does not exist', () => {
      it('should a error status and message', async () => {
        const id = uuid();
        const result = async () => await usersService.findOne(id);

        expect(result).rejects.toEqual(
          new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: 'Nenhum usuário encontrado',
            },
            HttpStatus.NOT_FOUND,
          ),
        );
      });
    });
  });
  describe('Update User', () => {
    const createDTO: CreateUserDto = {
      id: uuid(),
      name: 'Matheus Cortez',
      password: '1234',
      email: 'Matheus.cortez@live.com',
      cep: '03607060',
    };
    const updateUser: UpdateUserDto = {
      name: 'Matheus Silva',
      cep: '',
    };
    describe('when the update is successful ', () => {
      it('should a user updated sucess', async () => {
        const user = await usersService.create(createDTO);
        const userUpdated = await usersService.update(user.id, updateUser);
        expect(userUpdated.name).toEqual(updateUser.name);
      });
    });
    describe('When the user not found', () => {
      it('should a error status and message', async () => {
        const id = uuid();
        const result = async () => await usersService.update(id, updateUser);
        expect(result).rejects.toEqual(
          new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: 'Nenhum usuário encontrado',
            },
            HttpStatus.NOT_FOUND,
          ),
        );
      });
    });
  });
  describe('Deleted User', () => {
    const createDTO: CreateUserDto = {
      id: uuid(),
      name: 'Matheus Cortez',
      email: 'Matheus.cortez@live.com',
      password: '1234',
      cep: '03607060',
    };
    describe('When the delete is sucessful', () => {
      it('should a user delete sucess', async () => {
        const user = await usersService.create(createDTO);
        await usersService.remove(user.id);
        const userDeleted = await usersService.findOne(user.id);
        expect(userDeleted).toEqual(null);
      });
    });
    describe('When the user not found', () => {
      it('should a error status and message', async () => {
        const id = uuid();

        try {
          await usersService.remove(id);
        } catch (error) {
          expect(error).toEqual(
            new HttpException(
              {
                status: HttpStatus.NOT_FOUND,
                error: 'Nenhum usuário encontrado',
              },
              HttpStatus.NOT_FOUND,
            ),
          );
        }
      });
    });
  });
});
