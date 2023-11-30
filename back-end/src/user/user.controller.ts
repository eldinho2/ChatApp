import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('add')
  signin() {
    return this.usersService.addUser();
  }
}
