import { Logger as Log4Logger, Log4js } from 'log4js';

export interface LogConfig {
  filePath?: string;
  level?: string;
}

export type Logger = Log4Logger;

export type ILogger = Log4js;
