import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    ArticleModule,
    MongooseModule.forRoot(process.env.DB_URI, {
      dbName: 'with_tft',
    }),
  ],
})
export class AppModule {}
