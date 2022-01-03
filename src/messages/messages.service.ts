import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
    //Inject message repository
       constructor(private repo:MessagesRepository) {}

    //Create findOne method
    async findOne(id: number): Promise<string> {
        return this.repo.findOne(id);
    }

    //Create findAll method
    async findAll(): Promise<string[]> {
        return this.repo.findAll();
    }

    //Create create method
    async create(message: string): Promise<string> {
        return this.repo.create(message);
    }



}
