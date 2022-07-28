import { IsString, MinLength } from 'class-validator';

export class CreateAreaDto {
  id: number;
  @IsString()

  @MinLength(3, { message: 'El nombre debe tener un minimo de 3 caracteres',})
  nombre: string;
  
}
