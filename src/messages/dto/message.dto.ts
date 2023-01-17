import { IsString } from 'class-validator';

export class MessageDto {
  @IsString()
  from: string;
  @IsString()
  text: string;
  parent: number;
}

export default MessageDto;
