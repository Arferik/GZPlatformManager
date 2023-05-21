import { Module } from '@nestjs/common';
import { UserController } from '~/modules/user/user.controller';
import { UserService } from '~/modules/user/user.service';
import { UserDao } from '~/modules/user/user.dao';

@Module({
  controllers: [UserController],
  providers: [UserService, UserDao],
})
export class UserModule {}
