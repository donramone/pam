import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('pam');
  const logger = new Logger();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  logger.log(`Servidor corriendo en ${ await app.getUrl() }`);
}
bootstrap();
