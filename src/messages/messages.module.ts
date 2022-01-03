import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesRepository } from './messages.repository';
import { MessagesService } from './messages.service';

@Module({
  controllers: [MessagesController],
  //provider : en clair on peux definir ca comme chose dont une classe depend 
  providers: [MessagesService, MessagesRepository],
  //Permet de rendre ce service accessible dans tout les autres modules si il y'en as 
  exports: [MessagesService],
  //Permet d'importer un module qui est ouvert dans un autre module
  imports: [],
})

export class MessagesModule {

}
