import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entry';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async setUser(userMeta: userMeta): Promise<User> {
    const user = new User();
    user.username = userMeta.username;
    user.password = userMeta.password;
    const result = this.userRepository.save(user);
    return result;
  }

  async findOne(username: string): Promise<User> {
    const result = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    return result;
  }

  async getUser(userMeta: userMeta): Promise<User> {
    const { username, password } = userMeta;
    const result = await this.userRepository.findOne({
      where: {
        username,
        password,
      },
    });
    return result;
  }
}
