import { configure, Log4js } from 'log4js';
import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { LoggerConfigService } from './logger-config.service';
import {
  APP_KEY,
  LOG_CONFIG_KEY,
  LOG_CONFIG_OPTIONS,
  LOG_PROVIDER,
} from './logger.constant';
import { NestLoggerService } from './nest-logger.service';
import { CONFIG, Log } from '@nestboot/config';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({})
export class LoggerModule {
  static forRootAsync(options: Log): DynamicModule {
    const inject = options.inject || [];
    const optionsProvider = {
      provide: LOG_CONFIG_OPTIONS,
      useFactory: (...params: any[]) => {
        const registerOptions = options;
        const configService: ConfigService = params[inject.indexOf(CONFIG)];
        if (configService) {
          const name = configService.get(APP_KEY) as any;
          options = configService.get(LOG_CONFIG_KEY);
          options = {
            name,
            ...options,
          };
        }
        return Object.assign(registerOptions, options);
      },
      inject,
    };

    const loggerProvider: Provider = {
      provide: LOG_PROVIDER,
      useFactory: (options: Log): Log4js => {
        const logConfigService = new LoggerConfigService(options);
        return configure(logConfigService.loader());
      },
      inject: [LOG_CONFIG_OPTIONS],
    };
    return {
      module: LoggerModule,
      providers: [loggerProvider, optionsProvider, NestLoggerService],
      exports: [loggerProvider, NestLoggerService],
    };
  }
}
