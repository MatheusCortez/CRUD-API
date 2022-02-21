import { usersList } from './userList.mock';

export const userServiceMock = {
  create: jest.fn((dto) => {
    return {
      ...dto,
    };
  }),
  findAll: jest.fn().mockResolvedValue(usersList),
  findOne: jest.fn().mockResolvedValue(usersList[0].id),
  update: jest.fn(),
  remove: jest.fn(),
};
