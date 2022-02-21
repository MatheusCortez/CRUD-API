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

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('Create user', () => {
    const createDTO: CreateUserDto = {
      id: uuid(),
      name: 'Matheus Cortez',

      email: 'Matheus.cortez@live.com',

      cep: '03607060',
    };
    describe('When the service call is successful', () => {
      it('should call the method create with params ', async () => {
        const result = await userController.create(createDTO);
        expect(userServiceMock.create).toHaveBeenCalledWith(result);
      });
      it('should a create a user successfully', async () => {
        const result = await userController.create(createDTO);
        expect(result).toEqual(createDTO);
      });
      it('should  call  the method create', async () => {
        expect(userServiceMock.create).toHaveBeenCalled();
      });
    });
  });

  describe('GetUsers', () => {
    describe('when called the user list', () => {
      it('should return array users', async () => {
        const result = await userController.findAll();
        expect(result).toEqual(usersList);
      });
      it('should a call the method findAll', async () => {
        expect(userServiceMock.findAll).toHaveBeenCalled();
      });
    });

    describe('when called the user item', () => {
      it('should a get a user with a id param', async () => {
        const result = await userController.findOne(usersList[0].id);
        expect(userServiceMock.findOne).toHaveBeenLastCalledWith(
          usersList[0].id,
        );
      });
      it('should a call the findOne Method', async () => {
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
    describe('when  called the method update', () => {
      it('should update a user item successfully', async () => {
        const result = await userController.update(usersList[0].id, updateDTO);
        expect(userServiceMock.update).toBeCalled();
        expect(userServiceMock.update).toBeCalledWith(
          usersList[0].id,
          updateDTO,
        );
      });
    });
  });

  describe('Delete a user', () => {
    it('should remove a todo item successfully', async () => {
      const result = await userController.remove(usersList[1].id);
      expect(userServiceMock.remove).toBeCalled();
      expect(userServiceMock.remove).toHaveBeenCalledWith(usersList[1].id);
      expect(result).toEqual(undefined);
    });
  });
});
