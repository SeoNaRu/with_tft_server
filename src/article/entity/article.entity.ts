// src/post/entity/post.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ArticleSchema = HydratedDocument<Article>;

@Schema()
export class Article {
  @Prop({ type: String, required: true })
  puuid: string;

  @Prop({ type: String, required: true })
  nickName: string;

  @Prop({ type: String, required: true })
  lineTag: string;

  @Prop({ type: String, required: true })
  tier: string;

  @Prop({ type: String, required: true })
  gameType: string;

  @Prop({ type: Boolean, required: true })
  vocie: boolean;

  @Prop({ type: String, required: true })
  personel: string;

  @Prop({ type: Date, default: Date.now }) // 업데이트 일자를 저장하는 필드
  updatedAt: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'articles',
  }) // Assuming it's the user's ID who created the post
  authorId: mongoose.Schema.Types.ObjectId;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
