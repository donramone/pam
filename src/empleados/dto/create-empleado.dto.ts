import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Actividad } from '../entities/actividad.entity';

class AreaDto {
  @IsOptional()
  id: number;

  @IsString()
  nombre: string;
}

class ActividadDto {
  @IsOptional()
  @IsString()
  ocupacion: string;

  @IsOptional()
  importe: number;

  @IsOptional()
  estado: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => AreaDto)
  area: AreaDto;
}



export class CreateEmpleadoDto {
  @IsOptional()
  id?: number;
  @IsString()
  @IsNotEmpty()
  nombre: string;
  @IsString()
  dni: string;
  @IsString()
  cuil: string;

  @IsDateString()
  fechaNacimiento: string;
  @IsString()
  direccion: string;
  @IsString()
  telefono: string;
  @IsOptional()
  @ValidateNested()
  @Type(() => ActividadDto)
  actividad: ActividadDto;
}
