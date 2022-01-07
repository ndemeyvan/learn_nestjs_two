import { NestFactory } from '@nestjs/core';
//importe validation pipe
import { ValidationPipe } from '@nestjs/common';
//import user module
import { AppModule } from './app.module';

const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    name: 'session',//name of the cookie
    keys: ['key1', 'key2'],//keys for encryption
    //maxAge of 24 hours
    maxAge: 24 * 60 * 60 * 1000,
  }));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
