import { IsString, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAreaDto } from 'src/area/dto/create-area.dto';

export class TrabajoDTO {
 // @IsString()
//  @IsNotEmpty()
  ocupacion: string;

//  @IsNumber()
//  @IsNotEmpty()
  salario: number;

//  @IsString()
//  @IsNotEmpty()
  estado: boolean;
/*
  @ValidateNested()
  @Type(() => CreateAreaDto)
  area: CreateAreaDto;
  */
}