import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserSchema = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Date, default: Date.now, required: true })
  joinDate: Date;

  @Prop({
    type: {
      model: { type: String, required: true },
      manufactureYear: { type: Number, required: true },
      plateNumber: { type: String, required: true },
      photoUrl: { type: String, required: true },
      isVerified: { type: Boolean, required: true },
      verificationStatus: {
        type: String,
        enum: ['Pending', 'Verified', 'Rejected'],
        required: true,
      },
    },
  })
  car: {
    model: string;
    manufactureYear: number;
    plateNumber: string;
    photoUrl: string;
    isVerified: boolean;
    verificationStatus: 'Pending' | 'Verified' | 'Rejected';
  };

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }])
  posts: mongoose.Schema.Types.ObjectId;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }])
  comments: mongoose.Schema.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
