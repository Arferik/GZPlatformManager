import { NestLoggerService } from '@ddboot/log4js';
import { INestApplication, Module, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/error.filter';
import { ResponseTransformInterceptor } from './interceptors/response-transform.interceptor';
import { HttpLoggerInterceptor } from './interceptors/http-logger.interceptor';

@Module({
  providers: [],
  exports: [],
})
export class NestBootFactory {
  static create(app: INestApplication): INestApplication {
    const log4jService = app.get(NestLoggerService);
    app.useLogger(log4jService);
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(
      new ResponseTransformInterceptor(),
      new HttpLoggerInterceptor(log4jService),
    );
    app.useGlobalFilters(new HttpExceptionFilter(log4jService));
    return app;
  }
}
