import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  async signin() {
    return { message: 'Signin' };
  }

  async signup() {
    return { message: 'Signup' };
  }

  async signout() {
    return { message: 'Signout' };
  }
}
