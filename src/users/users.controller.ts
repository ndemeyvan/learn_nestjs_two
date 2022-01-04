import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
//import user dto
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class UsersController {



   //Create users method here
   @Post("/signup")
    createUser(@Body() createUserDto: CreateUserDto) {
        return 'This action adds a new user';
    }

    //Sign in method here
    @Post("/signin")
    signIn(@Body() createUserDto: CreateUserDto) {
        return 'This action signs in a user : ' + createUserDto.email;
    }



}
