import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userSerive: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userSerive.getUser({ username, password });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, id: user.id };
    return {
      code: 200,
      msg: '登录成功',
      data: {
        username: user.username,
        access_token: this.jwtService.sign(payload),
      },
    };
  }

  async register(user: any) {
    const userExist = await this.userSerive.findOne(user.username);
    if (userExist === undefined) {
      const newUser = await this.userSerive.setUser({
        username: user.username,
        password: user.password,
      });
      const payload = {
        username: newUser.username,
        id: newUser.id,
      };
      return {
        code: 200,
        msg: '注册成功',
        data: {
          username: user.username,
          access_token: this.jwtService.sign(payload),
        },
      };
    }
    return {
      code: 401,
      msg: '该用户名已被注册',
    };
  }
}
