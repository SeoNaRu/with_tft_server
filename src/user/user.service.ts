import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserSchema } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private userModel: Model<UserSchema>) {}

  async saveOrUpdateUser(createUserDto: CreateUserDto): Promise<UserSchema[]> {
    const existingUser = await this.userModel
      .findOne({ puuid: createUserDto.puuid })
      .exec();

    if (existingUser) {
      // If user with given puuid exists, update the user information
      try {
        await this.userModel.updateOne(
          { puuid: createUserDto.puuid },
          createUserDto,
        );
        const users = await this.userModel.find().exec();
        return users;
      } catch (error) {
        throw new HttpException(
          {
            message: 'UpdateUserDB 에러',
            error: error.message,
          },
          HttpStatus.FORBIDDEN,
        );
      }
    } else {
      // If user with given puuid does not exist, create a new user
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
            message: 'SaveUserDB 에러',
            error: error.message,
          },
          HttpStatus.FORBIDDEN,
        );
      }
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
