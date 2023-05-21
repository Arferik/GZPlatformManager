import { Controller } from '@nestjs/common';
import { Log4j, Logger } from '@ddboot/log4js';

@Controller()
export class UserController {
  @Log4j()
  private logger: Logger;

  constructor() {}
}
