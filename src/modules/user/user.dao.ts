import { Injectable } from '@nestjs/common';
import { PrismaService } from '@nestboot/prisma';
import { from } from 'rxjs';

@Injectable()
export class UserDao {
  constructor(private readonly prismaService: PrismaService) {}

  getUserByName$(name: string) {
    return from(
      this.prismaService.user.findFirst({
        where: {
          username: name,
        },
      }),
    );
  }
}
