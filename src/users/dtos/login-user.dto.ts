//import dto validation
import { IsString, IsEmail, IsNotEmpty, IsAlphanumeric } from 'class-validator';

export class LoginUserDto {

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  password: string;
}
