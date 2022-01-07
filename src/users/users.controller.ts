import { Body, Controller, Delete, Get, Param, Post, Put,Session } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { User } from './entities/user.entity';
import { CurrentUser } from './decorators/current-user.decorator';


@Controller('auth')
@Serialize(UserDto)
export class UsersController {

    //import user service
    constructor(private  usersService: UsersService,private authService:AuthService) { }

   //Create users method here
   @Post("/signup")
    async createUser(@Body() createUserDto: CreateUserDto,@Session() session:any) {
        const user = await this.authService.signUp(createUserDto);
        session.userId = user.id;
        return user;
    }

    @Get("/me")
    async getMe(@Session() session:any,@CurrentUser() user:User) {        
        return await this.usersService.getUserById(parseInt(session.userId));
    }

    // log an user out
    @Post("/signout")
    logout(@Session() session:any) {
        session.userId = null;
    }

    //Sign in method here
    @Post("/signin")
    async signIn(@Body() loginUserDto: LoginUserDto,@Session() session:any) {
        const user = await  this.authService.signIn(loginUserDto);
        session.userId = user.id;
        return user;
    }

    //Get all users method here
    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
    }

    //Get user by email method here
    // @UseInterceptors(new SerializeInterceptor(UserDto))
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
    updateUser(@Param('id') id: number, @Body() createUserDto: CreateUserDto) {
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
