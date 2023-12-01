import { UserService } from './user.service';
import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import { UserSchema } from './entity/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createPost(@Body() createUserDto: CreateUserDto): Promise<UserSchema[]> {
    return this.userService.saveOrUpdateUser(createUserDto);
  }

  @Get()
  getAllPosts(): Promise<UserSchema[]> {
    return this.userService.getAllUser();
  }
}
