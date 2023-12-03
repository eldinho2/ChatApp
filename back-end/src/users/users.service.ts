import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(
    email: string,
    userName: string,
    hashedPassword: string,
  ): Promise<any> {
    return this.prisma.user.create({
      data: {
        email,
        userName,
        hashedPassword,
      },
    });
  }

  async addFriend(): Promise<void> {
    // Implemente a lógica para adicionar um amigo a um usuário
  }
}
