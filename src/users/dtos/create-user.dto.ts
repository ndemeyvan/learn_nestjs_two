//import dto validation
import { IsString, IsEmail, IsNotEmpty, IsAlphanumeric } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  password: string;
}
