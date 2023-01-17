import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare, hash } from 'bcrypt';
import RegisterUserDto from './dto/registerUser.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const hashedPassword = await hash(
      registerUserDto.password,
      parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS),
    );

    return await this.usersService.createUser({
      ...registerUserDto,
      password: hashedPassword,
    });
  }

  async validateUser(name: string, password: string): Promise<any> {
    const user = await this.usersService.findUser(name);

    return user && (await compare(password, user.password));
  }
}
