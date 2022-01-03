// Le Data Transfer Object (DTO) est un objet qui représente un modèle de données.
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
    @IsString()
    @IsNotEmpty()
    content: string;
}