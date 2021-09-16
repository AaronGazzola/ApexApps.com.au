import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'https://apexapps.com.au',
      'http://localhost:3000',
      'https://youtube.com',
    ],
  });
  await app.listen(5000);
}
bootstrap();
