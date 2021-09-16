import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(
    process.env.NODE_ENV === 'development'
      ? { origin: 'http://localhost:3000' }
      : { origin: 'https://apexapps.com.au' },
  );
  await app.listen(5000);
}
bootstrap();
