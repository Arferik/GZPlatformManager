import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseException extends HttpException {
  constructor(errorCode: string) {
    super(errorCode, HttpStatus.BAD_REQUEST);
  }
}
