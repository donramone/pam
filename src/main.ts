import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  // const envFilePath = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
  // dotenv.config({ path: envFilePath });

  // console.log(`Loaded env file: ${envFilePath}`);
  // console.log(`Database Host: ${process.env.DATABASE_HOST}`);
  
  
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.setGlobalPrefix('pam');
  const logger = new Logger();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  logger.log(`Servidor corriendo en ${await app.getUrl()}`);
}
bootstrap();
