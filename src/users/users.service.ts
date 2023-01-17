import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import RegisterUserDto from '../auth/dto/registerUser.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(registerUserDto: RegisterUserDto) {
    if (await this.findUser(registerUserDto.name))
      throw new BadRequestException('Имя занято');

    const newUser = await this.usersRepository.create({
      name: registerUserDto.name,
      password: registerUserDto.password,
    });

    await this.usersRepository.save(newUser);

    return newUser;
  }

  async findUser(name: string): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({ name: name });
  }
}
