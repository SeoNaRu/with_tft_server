import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ArticleModule,
    UserModule,
    MongooseModule.forRoot(process.env.DB_URI, {
      dbName: 'with_tft',
    }),
  ],
})
export class AppModule {}
