import { Log } from '@nestboot/config';
import { Configuration } from 'log4js';

const layout = {
  type: 'pattern',
  pattern: '[%d{yyyy-MM-dd hh:mm:ss.SSS}] [%p] [%c] - %m',
};

const interfaceLayout = {
  type: 'pattern',
  pattern: '[%d{yyyy-MM-dd hh:mm:ss.SSS}] [%p] - %m',
};

export class LoggerConfigService {
  constructor(private readonly logConfig: Log) {}

  loader(): Configuration {
    const logPathMaps = {
      run: `${this.logConfig.path}/run/r${this.logConfig.name}.log`,
      debug: `${this.logConfig.path}/debug/${this.logConfig.name}/d${this.logConfig.name}.log`,
      interface: `${this.logConfig.path}/interface/i${this.logConfig.name}.log`,
    };
    return {
      appenders: {
        console: {
          type: 'console',
          layout: {
            type: 'pattern',
            pattern: '%[[%d{yyyy-MM-dd hh:mm:ss.SSS}] [%p] %c -%] %m',
          },
          level: 'debug',
        },
        rApp: {
          type: 'dateFile',
          filename: logPathMaps.run,
          pattern: 'yyyy-MM-dd',
          maxLogSize: '10M',
          keepFileExt: true,
          compress: true,
          layout,
        },
        dApp: {
          type: 'dateFile',
          filename: logPathMaps.debug,
          pattern: 'yyyy-MM-dd',
          maxLogSize: '10M',
          keepFileExt: true,
          compress: true,
          layout,
        },
        interface: {
          type: 'dateFile',
          filename: logPathMaps.interface,
          pattern: 'yyyy-MM-dd',
          maxLogSize: '10M',
          keepFileExt: true,
          compress: true,
          interfaceLayout,
        },
        rAppLoggerFilter: {
          type: 'logLevelFilter',
          appender: 'rApp',
          level: 'info',
        },
        dAppLoggerFilter: {
          type: 'logLevelFilter',
          appender: 'dApp',
          level: this.logConfig.level === 'debug' ? 'debug' : 'off',
        },
      },
      categories: {
        default: {
          appenders: ['console', 'rAppLoggerFilter', 'dAppLoggerFilter'],
          level: this.logConfig.level || 'debug',
        },
        interface: {
          appenders: ['interface', 'console'],
          level: 'info',
        },
      },
    };
  }
}
