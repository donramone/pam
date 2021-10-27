import { IsString, MinLength } from 'class-validator';

export class CreateAreaDto {
  id: number;
  @IsString()
  @MinLength(3, { message: 'El minimo de caracteres es 3',})
  nombre: string;
}
