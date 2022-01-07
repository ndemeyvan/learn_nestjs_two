import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import {randomBytes,scrypt as _scrypt} from 'crypto';
import { promisify } from 'util';
import { LoginUserDto } from './dtos/login-user.dto';

const scrypt = promisify(_scrypt);



@Injectable()
export class AuthService {

    constructor(private userService:UsersService) {}

    async signUp(createUserDto: CreateUserDto) {
        //see if email already exists
        const existingUser = await this.userService.getUserByEmail(createUserDto.email);
        if(existingUser){
            throw new BadRequestException('Email already exists');
        }
        //Generate a salt
        const salt = randomBytes(8).toString('hex');
        //Hash password
        const hashedPassword = (await  scrypt(createUserDto.password,salt,32)) as Buffer;
        //Join the Hashed result and salt together
        const hashedPasswordWithSalt = salt + '.' + hashedPassword.toString('hex');
        //Create and save user return user
        return await this.userService.createUser(createUserDto.email,createUserDto.name,hashedPasswordWithSalt)
    }

    async signIn(loginUserDto: LoginUserDto) {
         //see if email already exists
         const existingUser = await this.userService.getUserByEmail(loginUserDto.email);
         if(!existingUser){
            throw new NotFoundException('User not found');
        }
        //Split the salt and hashed password
        const [salt,hashedPassword] = existingUser.password.split('.');
        //Hash the password
        const newHashPassword = (await  scrypt(loginUserDto.password,salt,32)) as Buffer;
        if(newHashPassword.toString('hex') !== hashedPassword){
            throw new BadRequestException('Invalid email/password');
        }
        return existingUser;
    }



}
