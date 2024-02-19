import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpleadoDto } from './create-empleado.dto';

export class UpdateEmpleadoDTO extends PartialType(CreateEmpleadoDto) {
  id: number;
}

/*
export class UpdateEmpleadoDto extends PartialType(CreateEmpleadoDto) {
  nombre: string;
  dni: string;
  fechaNacimiento: Date;
  direccion: string;
  telefono: string;
  email: string;
  ocupacion: string;
  importe: number;
  // Si solo se llama area me da error??
  areaId: number;
}
*/