import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors'; // cors 모듈 추가

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // 1. CORS 설정 추가
    app.use(
      cors({
        origin: ['http://localhost:3060', 'http://52.78.104.66'],
        credentials: true,
      }),
    );

    // 2. 포트 번호 변경 및 서버 시작
    await app.listen(80, () => {
      console.log('서버 실행 중!');
    });
  } catch (error) {
    console.error('Error during application bootstrap:', error);
  }
}

bootstrap();
