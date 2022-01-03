import { Body, Controller, Get, Param, Post,NotFoundException } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';
import { warn } from 'console';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    
    constructor(private service :MessagesService) {}

    //Create a Get messsage method
    @Get()
    listMessages() {
        return this.service.findAll();
    }

    //Create a @Post messsage method
    @Post()
    createMessage(@Body() body: CreateMessageDto) {
        warn(`#### LOG : THIS IS THE BODY ${body.content}`) 
        return this.service.create(body.content);
    }

    //Create a Get specific messsage method
    @Get("/:id")
    async getMessage(@Param('id') id: number) {
        warn(`#### LOG : THIS IS THE ID ${id}`) 
        const message = await  this.service.findOne(id);
        if(id==2){
            throw new NotFoundException("message not found");
        }else{
            return message;
        } 
    }








}
