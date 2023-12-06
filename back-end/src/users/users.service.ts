import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

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
    return this.prisma.user.findUnique({
      where: {
        userName: userName,
      },
      select: {
        id: true,
        userName: true,
      },
    });
  }

  async getUserFriends(userName: string) {
    return this.prisma.user.findUnique({
      where: {
        userName: userName,
      },
      select: {
        id: true,
        friends: true,
      },
    });
  }

  async addFriend(friendName: string, userName: string) {
    const user = await this.prisma.user.findUnique({
      where: { userName: userName },
    });

    const friend = await this.prisma.user.findUnique({
      where: { userName: friendName },
    });

    if (!friend || !user) {
      throw new Error('User or friend not found');
    }

    // Verifique se o amigo já existe na lista de amigos do usuário
    const existingFriend = await this.prisma.friend.findFirst({
      where: {
        userId: user.id,
        friendName: friend.userName,
      },
    });
    if (existingFriend) {
      throw new Error('Friend already added');
    }
    // Crie um novo conversationId
    const conversationId = uuidv4();
    // Adicione o user2 à lista de amigos do user1
    await this.prisma.friend.create({
      data: {
        userId: user.id,
        friendName: friend.userName,
        conversationId: conversationId,
      },
    });
    // Adicione o user1 à lista de amigos do user2
    await this.prisma.friend.create({
      data: {
        userId: friend.id,
        friendName: user.userName,
        conversationId: conversationId,
      },
    });

    return { message: 'Friend added successfully' };
  }

  async removeFriend(friendName: string, userName: string) {
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
      throw new Error('User or friend not found');
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
  }
}
