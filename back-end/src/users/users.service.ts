import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException, ConflictException } from '@nestjs/common';

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

  async getUser(userName: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          userName: userName,
        },
        select: {
          id: true,
          userName: true,
        },
      });

      if (!user) {
        throw new NotFoundException('Usuario não encontrado');
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        console.error(error);
        throw new Error('aconteceu um erro inesperado');
      }
    }
  }

  async getUserFriends(userName: string) {
    try {
      return this.prisma.user.findUnique({
        where: {
          userName: userName,
        },
        select: {
          id: true,
          friends: true,
        },
      });
    } catch (error) {
      throw new Error('Usuario não encontrado');
    }
  }

  async addFriend(userName: string, friendName: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { userName },
        select: { id: true },
      });

      const friend = await this.prisma.user.findUnique({
        where: { userName: friendName },
        select: { userName: true },
      });

      if (!friend || !user) {
        throw new NotFoundException('Usuario ou amigo não encontrado');
      }

      const existingFriend = await this.prisma.friend.findFirst({
        where: {
          userId: user.id,
          friendName: friend.userName,
        },
      });

      if (existingFriend) {
        throw new ConflictException('amigo ja adicionado');
      }

      const conversationId = uuidv4();

      await this.prisma.friend.create({
        data: {
          userId: user.id,
          friendName: friend.userName,
          conversationId: conversationId,
        },
      });
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      } else {
        console.error(error);
        throw new Error('ocorreu um erro inesperado');
      }
    }
  }

  async removeFriend(friendName: string, userName: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          userName: userName,
        },
        select: {
          id: true,
        },
      });

      const friend = await this.prisma.user.findUnique({
        where: {
          userName: friendName,
        },
        select: {
          id: true,
        },
      });

      if (!friend || !user) {
        throw new Error('Usuario ou amigo não encontrado');
      }

      // Remover o amigo da lista de amigos do usuário
      await this.prisma.friend.deleteMany({
        where: {
          userId: user.id,
          friendName: friendName,
        },
      });

      // Remover o usuário da lista de amigos do amigo
      await this.prisma.friend.deleteMany({
        where: {
          userId: friend.id,
          friendName: userName,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
