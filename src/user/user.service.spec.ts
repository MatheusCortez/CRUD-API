import { uuid } from 'uuidv4';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ApicepService } from '../services/apicep/apicep.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UserDocument } from '../schemas/user.schema';
import { usersList } from './test/mocks/userList.mock';
import { mockUserModel } from './test/mocks/user.model.mock';

describe('User Model Service', () => {
  let usersService: UserService;
  let userModel: Model<UserDocument>;

  const mockAPiService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApicepService,
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    })
      .overrideProvider(ApicepService)
      .useValue(mockAPiService)
      .compile();

    usersService = module.get<UserService>(UserService);
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
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

      cep: '03607060',
    };
    it('should create a new user  successfully', async () => {
      const result = await usersService.create(createDTO);

      expect(userModel.create).toBeCalled();
      expect(userModel.create).toBeCalledWith(createDTO);
    });
  });
  describe('findAll', () => {
    it('should return a UsersList sucessfully', async () => {
      const result = await usersService.findAll();

      expect(result).toEqual(usersList);
      expect(userModel.find).toHaveBeenCalled();
    });
  });

  describe('FindOne User', () => {
    it('should return a User  item successfully', async () => {
      const result = await usersService.findOne(usersList[1].id);

      expect(mockUserModel.findById).toBeCalled();
      expect(mockUserModel.findById).toBeCalledWith(usersList[1].id);
      expect(result).toEqual(usersList[1]);
    });
  });

  //  describe('update a  user', () => {});

  //describe('remove a user', () => {});
});
