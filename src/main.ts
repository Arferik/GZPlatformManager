import { NestBootFactory } from '@nestboot/core';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BaseErrorExceptionFilter } from './exceptions/base.exception.filter';

async function bootstrap() {
  const app = NestBootFactory.create(await NestFactory.create(AppModule));
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new BaseErrorExceptionFilter(httpAdapter));
  await app.listen(3000);
}
bootstrap();
