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
    const existingUserArticle = await this.articleModel
      .findOne({ puuid: createArticleDto.puuid })
      .exec();

    if (existingUserArticle) {
      try {
        createArticleDto.updatedAt = new Date();
        await this.articleModel.updateOne(
          { puuid: createArticleDto.puuid },
          { ...createArticleDto, updatedAt: createArticleDto.updatedAt },
        );

        const article = await this.articleModel
          .find()
          .sort({ updatedAt: -1 })
          .exec();
        return article;
      } catch (error) {
        throw new HttpException(
          {
            message: 'DB에러',
            error: error.sqlMessage,
          },
          HttpStatus.FORBIDDEN,
        );
      }
    } else {
      const saveArticle = new this.articleModel({
        ...createArticleDto,
      });

      try {
        await saveArticle.save();
        const articles = await this.articleModel
          .find()
          .sort({ updatedAt: -1 })
          .exec();
        return articles;
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

  async getAllArticle(): Promise<ArticleSchema[]> {
    try {
      return this.articleModel.find().sort({ updatedAt: -1 }).exec();
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
