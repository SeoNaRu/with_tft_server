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
      try {
        createUserDto.updatedAt = new Date();
        await this.userModel.updateOne(
          { puuid: createUserDto.puuid },
          { ...createUserDto, updatedAt: createUserDto.updatedAt },
        );

        const users = await this.userModel
          .find({ visible: true })
          .sort({ updatedAt: -1 })
          .exec();
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
      const saveUser = new this.userModel({
        ...createUserDto,
      });

      try {
        await saveUser.save();
        const users = await this.userModel
          .find({ visible: true })
          .sort({ updatedAt: -1 })
          .exec();
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
      return this.userModel
        .find({ visible: true })
        .sort({ updatedAt: -1 })
        .exec();
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
