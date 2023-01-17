import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfiguration } from './database.configuration';
import { ChatModule } from './chat/chat.module';
import { MessagesModule } from './messages/messages.module';
import { MomentModule } from './moment/moment.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfiguration,
    }),
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ChatModule,
    MessagesModule,
    MomentModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
