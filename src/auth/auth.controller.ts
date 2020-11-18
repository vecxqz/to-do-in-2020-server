import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('local-login')
  async localLogin(@Request() req): Promise<any> {
    return req.user;
  }

  @Post('jwt-register')
  async jwtRegister(@Body() body): Promise<any> {
    const { username, password } = body;
    return this.authService.register({ username, password });
  }

  @UseGuards(AuthGuard('local'))
  @Post('jwt-login')
  async jwtLogin(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
