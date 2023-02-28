import { ConfigOption } from './config.interface';
import { Module, Global, DynamicModule, Provider } from '@nestjs/common';
import { CONFIG_OPTION, CONFIG, CONFIG_NAME } from './config.constant';
import { ConfigFileLoader } from './config-file.loader';
import { ConfigService } from './config.service';

const configProvider: Provider = {
  provide: CONFIG,
  useClass: ConfigService,
};

@Module({
  providers: [configProvider, ConfigFileLoader],
  exports: [configProvider],
})
@Global()
export class ConfigModule {
  static forRoot(options: ConfigOption): DynamicModule {
    const configBootOptionProvider: Provider = {
      provide: CONFIG_OPTION,
      useFactory() {
        return Object.assign(
          {
            fileName: CONFIG_NAME,
            filePath: '.',
          },
          options,
        );
      },
    };
    return {
      global: true,
      module: ConfigModule,
      providers: [configBootOptionProvider],
    };
  }
}
