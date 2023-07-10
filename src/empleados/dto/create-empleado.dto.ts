import {
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { TrabajoDTO } from './trabajo.dto';
import { Type } from 'class-transformer';

export class CreateEmpleadoDto {
  //   @IsString()
  //   @IsNotEmpty()
  id?: number;
  nombre: string;

  //    @IsString()
  //    @IsNotEmpty()
  trabajo: {
    ocupacion: string;
    salario: number;
    estado: boolean;
  };

  //    @ValidateNested()
  //    @Type(() => TrabajoDTO)
  //    trabajo: TrabajoDTO;
}

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
