import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesRepository } from './messages.repository';
import { MessagesService } from './messages.service';

@Module({
  controllers: [MessagesController],
  //provider : en clair on peux definir ca comme chose dont une classe depend 
  providers: [MessagesService, MessagesRepository],
})
export class MessagesModule {

}
