import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export default class UserDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  _id!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  email!: string;

  @IsNotEmpty()
  @IsString()
  strategy!: string;
}
