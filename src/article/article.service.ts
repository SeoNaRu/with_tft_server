import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ArticleSchema } from './entity/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('articles') private articleModel: Model<ArticleSchema>,
  ) {}

  async createArticle(
    createArticleDto: CreateArticleDto,
  ): Promise<ArticleSchema[]> {
    const createdArticle = new this.articleModel({
      ...createArticleDto,
    });

    try {
      await createdArticle.save();

      const articles = await this.articleModel.find().exec();

      return articles;
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

  async getAllArticle(): Promise<ArticleSchema[]> {
    try {
      return this.articleModel.find().exec();
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
