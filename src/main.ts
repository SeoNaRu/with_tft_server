import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    // 0.0.0.0은 모든 IP에서 접속을 허용하는 의미입니다.
    await app.listen(8080, '0.0.0.0');
    console.log(`Application is running on: http://localhost:8080`);
  } catch (error) {
    console.error('Error during application bootstrap:', error);
  }
}

bootstrap();
