import { PartialType } from '@nestjs/mapped-types';
import { MinLength } from 'class-validator';
import { CreateAreaDto } from './create-area.dto';

export class UpdateAreaDto extends PartialType(CreateAreaDto) {
    @MinLength(3, { message: 'El nombre debe tener un minimo de 3 caracteres',})
    nombre: string;
}
