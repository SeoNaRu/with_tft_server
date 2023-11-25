import { Controller, Post, Body, Res, Get, HttpStatus } from '@nestjs/common';

import { UserService } from './user.service';
import { UserSchema } from './entity/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('signup')
  async create(@Res() response, @Body() user: UserSchema): Promise<UserSchema> {
    const signupResponse = await this.usersService.create(user);
    try {
      return response.status(HttpStatus.OK).json({
        message: 'SignUp completed',
        signupResponse: signupResponse,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Get('login')
  async login(
    @Res() response,
    @Body('userName') userName: string,
    @Body('userPassword') userPassword: string,
  ): Promise<UserSchema> {
    const loginResponse = await this.usersService.login(userName, userPassword);

    try {
      return response.status(HttpStatus.OK).json({
        message: 'login completed',
        loginResponse: loginResponse,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
}
