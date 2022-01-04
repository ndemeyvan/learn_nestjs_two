import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
//import user dto
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class UsersController {

    //import user service
    constructor(private  usersService: UsersService) { }



   //Create users method here
   @Post("/signup")
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    //Sign in method here
    @Post("/signin")
    signIn(@Body() createUserDto: CreateUserDto) {
        return 'This action signs in a user : ' + createUserDto.email;
    }

    //Get all users method here
    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
    }


    //Get user by email method here
    @Get("/:id")
    getUserById(@Param('id') id: string) {
        return this.usersService.getUserById(parseInt(id));
    }

    //Delete user method here
    @Delete("/delete/:id")
    deleteUser(@Param('id')id: number) {
        return this.usersService.deleteUser(id);
    }

    //Update user method here
    @Put("/update/:id")
    updateUser(@Param('id')id: number, @Body() createUserDto: CreateUserDto) {
        return this.usersService.updateUser(id, createUserDto);
    }

    //Get user with pagination method here
    @Get("/pagination/:page/:limit")
    getUsersWithPagination(@Param('page')page: number, @Param('limit')limit: number) {
        return this.usersService.getUsersWithPagination(page, limit);
    }

    //Get user base on id and email method here
    @Get("/:id/:email")
    getUserByIdAndEmail(@Param('id')id: number, @Param('email')email: string) {
        return this.usersService.getUserByIdAndEmail(id, email);
    }

    





}
