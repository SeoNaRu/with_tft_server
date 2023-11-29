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

  @Prop({ type: String, required: true })
  vocie: string;

  @Prop({ type: String, required: true })
  personel: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'articles',
  }) // Assuming it's the user's ID who created the post
  authorId: mongoose.Schema.Types.ObjectId;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
