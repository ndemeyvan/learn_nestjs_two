import { Injectable, NotFoundException } from '@nestjs/common';
//import injectRepository from typeorm
import { InjectRepository } from '@nestjs/typeorm';
//import user entity
import { User } from './entities/user.entity';
//import repository from typeOrm
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
  ) {}

  // //Create user method
  async createUser(email:string, name:string, password:string) {
      const user = new User();
      user.email = email;
      user.name = name;
      user.password = password ;
      const userCreate = this.repo.create(user);
      return await this.repo.save(userCreate);
  }

  //Get all users method
  async getAllUsers() {
    return await this.repo.find();
  }

  //Get user base on email method
  async getUserByEmail(email: string) {
    return await this.repo.findOne({
      where: [
        {
          email: email,
        },
      ],
    });
  }

  //Get user by id method
  async getUserById(id: number) {
    const user = await this.repo.findOne(id);
    //Catch error if user not found
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  //Delete user method
  async deleteUser(id: number) {
    const user = await this.repo.findOne(id);
    //Catch error if user not found
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.repo.delete(id);
  }

  //Update user method
  async updateUser(id: number, createUserDto: CreateUserDto) {
    const user = await this.repo.findOne(id);
    //Catch error if user not found
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    const userUpdate = this.repo.create(user);
    return await this.repo.save(userUpdate);
  }

  //Get user with pagination method
  async getUsersWithPagination(page: number, limit: number) {
    return await this.repo.find({
      skip: page * limit,
      take: limit,
    });
  }

  //Get user base on id and email method
  async getUserByIdAndEmail(id: number, email: string) {
    return await this.repo.findOne({
      where: [
        {
          id: id,
          email: email,
        },
      ],
    });
  }
}
