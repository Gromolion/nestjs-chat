import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { env } from 'process';
import { User } from './users/entities/user.entity';
import { Message } from './messages/entities/message.entity';

export class DatabaseConfiguration implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: env.DB_HOST,
      port: parseInt(env.DB_PORT, 10),
      username: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      entities: [User, Message],
      synchronize: true,
    };
  }
}
