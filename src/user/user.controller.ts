import { UserSwagger } from './../swagger/User.swagger';
import { BadRequestSwagger } from './../swagger/helpers/error.swagger';
import { CreateUserSwagger } from '../swagger/user/CreaterUser.swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({
    status: 400,
    description: 'Bad Request error',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 201,
    description: 'Create user Sucess',
    type: UserSwagger,
  })
  @ApiOperation({ summary: 'Create a new user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Return  a Array of Users' })
  @ApiResponse({
    status: 200,
    description: 'Return array users',
    type: UserSwagger,
    isArray: true,
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return a User' })
  @ApiResponse({
    status: 200,
    description: 'Return a  user with id searching',
    type: UserSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum usuário encontrado',
    type: BadRequestSwagger,
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update the user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully updated ',
    type: UserSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'User not Found',
    type: BadRequestSwagger,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'User successfully deleted ',
  })
  @ApiOperation({ summary: 'Delete the user' })
  @ApiResponse({
    status: 404,
    description: 'User not Found',
    type: BadRequestSwagger,
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
