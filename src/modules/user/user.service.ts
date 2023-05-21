import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Log4j, Logger } from '@ddboot/log4js';
import { UserDao } from '~/modules/user/user.dao';
import { map } from 'rxjs';
import { Value } from '@ddboot/config';

@Injectable()
export class UserService {
  @Log4j()
  private logger: Logger;

  @Value('crypto.pbk')
  private pbkKey: string;
  constructor(private readonly userDao: UserDao) {}

  sigIN(username: string, password: string) {
    this.logger.info('begin to sign in');
    return this.userDao.getUserByName$(username).pipe(
      map((user) => {
        if (!user) {
          this.logger.warn('user is not founded');
          throw new UnauthorizedException();
        }
        if (user.password === password) {
        }
      }),
    );
  }
}
