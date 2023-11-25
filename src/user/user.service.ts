import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchema } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel('Users') private UsersModule: Model<UserSchema>) {}

  async create(user: UserSchema): Promise<UserSchema> {
    const signup = await new this.UsersModule(user).save();
    try {
      return signup;
    } catch (error) {
      throw new HttpException(
        {
          message: 'DB에러',
          error: error.sqlMessage,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async login(userName: string, userPassword: string): Promise<UserSchema> {
    const loginUser = await this.UsersModule.findOne({
      name: userName,
      password: userPassword,
    }).exec();

    try {
      if (!loginUser) {
        throw new UnauthorizedException('Account that does not exist');
      }
      return loginUser;
    } catch (error) {
      throw new HttpException(
        {
          message: 'DB에러',
          error: error.sqlMessage,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
