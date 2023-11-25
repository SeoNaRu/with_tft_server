import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './entity/user.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
