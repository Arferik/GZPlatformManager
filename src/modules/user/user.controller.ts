import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from '~/modules/user/user.service';
import { UserDto } from '~/modules/user/user.dto';
import { Message } from '@ddboot/core';
import { AuthGuard } from '~/guard/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('login')
  @Message('user login success')
  login(@Body() user: UserDto) {
    return this.userService.signIn(user.username, user.password);
  }

  @Post('register')
  @Message('user register success')
  register(@Body() user: UserDto) {
    return this.userService.createUser(user.username, user.password);
  }

  @Get('current')
  @Message('get user ')
  @UseGuards(AuthGuard)
  getCurrent() {
    return {
      status: 'ok',
    };
  }
}
