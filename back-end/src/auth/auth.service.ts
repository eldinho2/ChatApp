import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    const { userName, email, password } = dto;
    if (this.emailUserExists) {
      throw new BadRequestException('Email ja está sendo ultilizado');
    }
    if (this.userNameExists) {
      throw new BadRequestException('Usuario ja está sendo ultilizado');
    }

    const hashedPassword = await this.hashPassword(password);

    await this.prisma.user.create({
      data: {
        userName,
        email,
        hashedPassword,
      },
    });
  }

  async signin() {
    return { message: 'signin' };
  }

  async signout() {
    return { message: 'Signout' };
  }

  async emailUserExists(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user ? true : false;
  }

  async userNameExists(userName: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        userName,
      },
    });
    return user ? true : false;
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;

    return await bcrypt.hash(password, saltOrRounds);
  }
}
