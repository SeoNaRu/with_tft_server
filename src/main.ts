import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(8080);
    console.log(`Application is running on: http://localhost:8080`);
  } catch (error) {
    console.error('Error during application bootstrap:', error);
  }
}

bootstrap();
