import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CONFIGURATION } from './constants/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(CONFIGURATION.PORT);
}
bootstrap();
