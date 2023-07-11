import {
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { TrabajoDTO } from './trabajo.dto';
import { Type } from 'class-transformer';

export class CreateEmpleadoDto {
  id?: number;
   @IsString()
   @IsNotEmpty()
   nombre: string;
   dni: string;
   cuil: string;
   fechaNacimiento: string;
   direccion: string;
   actividad: {
     salario: number;
     ocupacion: string;
   };
   area: {
     id: number;
     nombre: string;
   };
 }

  //    @ValidateNested()
  //    @Type(() => TrabajoDTO)
  //    trabajo: TrabajoDTO;


/*
  @MinLength(3, { message: 'El nombre debe tener un minimo de 3 caracteres' })
  nombre: string;
  @IsNotEmpty({ message: 'El DNI no puede estar vacio' })
  dni: string;
  fechaNacimiento: Date;
  direccion: string;
  telefono: string;
  email: string;
  ocupacion: string;
  salario: number;
  // Si solo se llama area me da error??
  areaId: number;
}
  */
