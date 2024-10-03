import { CreateAreaDto } from '../../area/dto/create-area.dto';
import { CreateAcreditacionesEmpleadoDto } from './create-acreditaciones-empleado.dto';
export class CreateAcreditacionDTO {
    totalImporte: number;
    totalEmpleados: number;
    periodo: string;
    acreditacionEmpleados: CreateAcreditacionesEmpleadoDto [];
    area: CreateAreaDto;
  }