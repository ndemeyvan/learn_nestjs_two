import { NestFactory } from '@nestjs/core';
//importe validation pipe
import { ValidationPipe } from '@nestjs/common';
//import user module
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
