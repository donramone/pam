import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateEmpleadoDto {
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
