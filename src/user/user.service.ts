import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserSchema } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private userModel: Model<UserSchema>) {}

  async SaveUser(createUserDto: CreateUserDto): Promise<UserSchema[]> {
    const saveUser = new this.userModel({
      ...createUserDto,
    });

    try {
      await saveUser.save();

      const users = await this.userModel.find().exec();

      return users;
    } catch (error) {
      throw new HttpException(
        {
          message: 'SaveUserDB에러',
          error: error.sqlMessage,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async getAllUser(): Promise<UserSchema[]> {
    try {
      return this.userModel.find().exec();
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
