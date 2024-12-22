import { IsString, IsUUID } from 'class-validator';

export class AuthRequestDto {
  @IsUUID()
  key: string;

  @IsString()
  login: string;
} 