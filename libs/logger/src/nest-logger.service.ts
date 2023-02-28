import { Injectable, LoggerService } from '@nestjs/common';
import { InjectLogger } from './logger.decorator';
import { ILogger } from './logger.interface';

@Injectable()
export class NestLoggerService implements LoggerService {
  constructor(@InjectLogger() private logger: ILogger) {}

  debug(message: any, context?: string): any {
    this.logger.getLogger(context).debug(message);
  }

  error(message: any, trace?: string, context?: string): any {
    this.logger.getLogger(context).error(message, trace);
  }

  log(message: any, context?: string): any {
    this.logger.getLogger(context).info(message);
  }

  warn(message: any, context?: string): any {
    this.logger.getLogger(context).warn(message);
  }
}
