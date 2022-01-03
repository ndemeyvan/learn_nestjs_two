import { NestFactory } from '@nestjs/core';
//importe validation pipe
import { ValidationPipe } from '@nestjs/common';
//import user module
import { UsersModule } from './users/users.module';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
