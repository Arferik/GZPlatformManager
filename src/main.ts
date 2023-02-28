import { NestBootFactory } from '@nestboot/core';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = NestBootFactory.create(await NestFactory.create(AppModule));
  await app.listen(3000);
}
bootstrap();
