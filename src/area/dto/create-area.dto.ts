import { IsNumber, IsString } from 'class-validator';

export class CreateAreaDto {
  @IsNumber()
  id: number;
  @IsString()
  nombre: string;
}
