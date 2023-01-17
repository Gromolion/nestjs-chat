import { BadRequestException, Injectable } from '@nestjs/common';
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

    const user = new User(registerUserDto.name, registerUserDto.password);

    await this.usersRepository.save(user);

    return user;
  }

  async findUser(name: string): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({ name: name });
  }

  async findUserById(id: number): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({ id: id });
  }

  async findUserBySocket(socket: string): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({ socket: socket });
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async save(user: User) {
    await this.usersRepository.save(user);
  }
}
