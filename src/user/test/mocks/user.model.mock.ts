import { usersList } from './userList.mock';
export const mockUserModel = {
  create: jest.fn(),
  find: jest.fn().mockResolvedValue(usersList),
  findOne: jest.fn().mockResolvedValue(usersList[1]),
  findById: jest.fn().mockResolvedValue(usersList[1]),
  findByIdAndUpdate: jest.fn(),
  deleteOne: jest.fn(),
};
