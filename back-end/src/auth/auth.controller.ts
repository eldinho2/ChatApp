import { Body, Controller, Post, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/authRegister.dto';
import { AuthLoginDto } from './dto/authLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthRegisterDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  async signin(@Body() dto: AuthLoginDto, @Response() res) {
    return this.authService.signin(dto, res);
  }

  @Post('signout')
  signout(@Response() res) {
    return this.authService.signout(res);
  }
}
