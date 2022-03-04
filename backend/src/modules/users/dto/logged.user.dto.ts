import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Token } from '../../../libs/interfaces/jwt/token.interface';

export default class LoggedUserDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  id!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  email!: string;

  @IsNotEmpty()
  @IsString()
  accessToken!: Token;

  @IsNotEmpty()
  @IsString()
  refreshToken!: Token;

  @IsNotEmpty()
  @IsString()
  strategy!: string;
}
