// article/article.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleSchema } from './entity/article.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'articles', schema: ArticleSchema }]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService], // ArticleService를 providers에 추가
})
export class ArticleModule {}
