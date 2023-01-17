import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Match } from '../passwordMatch.decorator';

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Имя не должно быть пустым' })
  @IsString()
  name: string;
  @IsString()
  @MinLength(8, { message: 'Пароль должен быть минимум 8 символов' })
  password: string;
  @IsString()
  @Match('password', { message: 'Пароли не совпадают' })
  repeatedPassword: string;
}

export default RegisterUserDto;
