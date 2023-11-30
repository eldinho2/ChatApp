import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async addUser() {
    return await this.prisma.user.create({
      data: {
        email: 'curuihgd@fdrgdr',
        hashedPassword: 'r4353453634g34t',
        UserName: 'Eldinho',
      },
    });
  }
}
