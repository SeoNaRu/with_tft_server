import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleService } from './article.service';
import { ArticleSchema } from './entity/article.entity';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  createPost(
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<ArticleSchema[]> {
    return this.articleService.createArticle(createArticleDto);
  }

  @Get()
  getAllPosts(): Promise<ArticleSchema[]> {
    return this.articleService.getAllArticle();
  }
}
