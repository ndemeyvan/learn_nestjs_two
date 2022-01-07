//import userInterceptor, NestInterceptor , ExcecutionContext,CallHandler from '@nestjs/common';
import {
  ExecutionContext,
  NestInterceptor,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';

interface ClassConstructor{
    new (...args: any[]): any;
}

export function Serialize(dto: ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto));
}



export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto:any ) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    //Ici c'est la ou il est possible d'excecuter un code avant la requete
    //ne soit excecuter par le request handler
    //on peut aussi utiliser le CallHandler pour retourner un resultat
    console.log('Before the handler ...');
    return handler.handle().pipe(
      map((data: any) => {
        console.log('Before the response is send out ...' ,data);
        return plainToClass(this.dto, data,{
            excludeExtraneousValues: true,
        });
      }),
    );
  }
}
