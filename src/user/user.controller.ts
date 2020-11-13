import { Body, Controller, Get, Post, Param, Query } from '@nestjs/common';
import { query } from 'express';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  setUser(@Body() body) {
    const { username, password }: { username: string; password: string } = body;
    return this.userService.setUser({ username, password });
  }

  @Get('/')
  getUser(@Query() query) {
    const {
      username,
      password,
    }: { username: string; password: string } = query;
    return this.userService.getUser({ username, password });
  }

  @Post('/register')
  async addUser(@Body() body) {
    const {
      username,
      password,
      rePassword,
    }: { username: string; password: string; rePassword: string } = body;
    if (password !== rePassword) {
      return {
        code: 400,
        msg: '两次密码输入不一致',
      };
    }
    const isRegister = await this.userService.findOne(username);
    if (isRegister === undefined) {
      const result = await this.userService.setUser({ username, password });
      return {
        code: 200,
        msg: '注册成功 ',
      };
    } else {
      return {
        code: 400,
        msg: '该用户已注册',
      };
    }
  }
}
