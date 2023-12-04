// src/post/entity/post.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserSchema = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String, required: true })
  puuid: string;

  @Prop({ type: String, required: true })
  nickName: string;

  @Prop({ type: String, required: true })
  lineTag: string;

  @Prop({ type: String, required: true })
  tier: string;

  @Prop({ type: String, required: true })
  age: string;

  @Prop({ type: String, required: true })
  gender: string;

  @Prop({ type: Boolean, required: true })
  myVoice: boolean;

  @Prop({ type: String, required: true })
  playStyle: string;

  @Prop({ type: String, required: true })
  duoType: string;

  @Prop({ type: String, required: true })
  playTime: string;

  @Prop({ type: Boolean, required: true })
  visible: boolean;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }) // Assuming it's the user's ID who created the post
  authorId: mongoose.Schema.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
