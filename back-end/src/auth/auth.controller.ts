import { Body, Controller, Post, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  async signin(@Body() dto: AuthDto, @Response() res) {
    return this.authService.signin(dto, res);
  }

  @Post('signout')
  signout(@Response() res) {
    return this.authService.signout(res);
  }
}
