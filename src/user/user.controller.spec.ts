import { CreateUserDto } from './dto/create-user.dto';
import { uuid } from 'uuidv4';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userServiceMock } from './test/mocks/user.service.mock';
import { usersList } from './test/mocks/userList.mock';

describe('User Module Controller', () => {
  let userController: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(userServiceMock)
      .compile();

    userController = module.get<UserController>(UserController);
  });
  it('Should be defined', () => {
    expect(userController).toBeDefined();
  });
  describe('Create user', () => {
    const createDTO: CreateUserDto = {
      id: uuid(),
      name: 'Matheus Cortez',
      email: 'Matheus.cortez@live.com',
      password: '',
      cep: '03607060',
    };
    describe('When the service call is successful', () => {
      it('Should call the method create with params ', async () => {
        const result = await userController.create(createDTO);
        expect(userServiceMock.create).toHaveBeenCalledWith(result);
      });
      it('Should a create a user successfully', async () => {
        const result = await userController.create(createDTO);
        expect(result).toEqual(createDTO);
      });
      it('Should  call  the method create', async () => {
        expect(userServiceMock.create).toHaveBeenCalled();
      });
    });
  });
  describe('GetUsers', () => {
    describe('When called the user list', () => {
      it('Should return array users', async () => {
        const result = await userController.findAll();
        expect(result).toEqual(usersList);
      });
      it('Should a call the method findAll', async () => {
        expect(userServiceMock.findAll).toHaveBeenCalled();
      });
    });
    describe('When called the user item ', () => {
      it('Should a get a user with a id param', async () => {
        const result = await userController.findOne(usersList[0].id);
        expect(userServiceMock.findOne).toHaveBeenLastCalledWith(
          usersList[0].id,
        );
      });
      it('Should a call the findOne Method', async () => {
        const result = await userController.findOne(usersList[0].id);
        expect(userServiceMock.findOne).toBeCalled();
      });
    });
  });
  describe('Update User', () => {
    const updateDTO = {
      name: 'Matheus Cortez',
      email: 'Matheus.cortez@live.com',
      cep: '03607060',
    };
    describe('When  called the method update', () => {
      it('Should call userServiceMock.update', async () => {
        const result = await userController.update(usersList[0].id, updateDTO);
        expect(userServiceMock.update).toBeCalled();
      });
      it('Should call userServiceMock.update with result id ', () => {
        expect(userServiceMock.update).toBeCalledWith(
          usersList[0].id,
          updateDTO,
        );
      });
    });
  });
  describe('Delete a user', () => {
    it('Should call userServiceMock.remove', async () => {
      const result = await userController.remove(usersList[0].id);
      expect(userServiceMock.update).toBeCalled();
    });
    it('Should call userServiceMock.remove with result id ', () => {
      expect(userServiceMock.remove).toBeCalledWith(usersList[0].id);
    });
  });
});
