import { Injectable } from '@nestjs/common';
import { Logger, InjectLogger, ILogger } from '@ddboot/log4js';
import { CryptoService } from '@nestboot/crypto';
@Injectable()
export class AppService {
  private logger: Logger;

  constructor(
    @InjectLogger() log: ILogger,
    private cryptoService: CryptoService,
  ) {
    this.logger = log.getLogger(AppService.name);
  }

  async getHello() {
    this.logger.info(
      'getHello',
      await this.cryptoService.encryptedPbkdf2('sss'),
    );
    return {
      name: 'name',
      version: 'version',
    };
  }
}
