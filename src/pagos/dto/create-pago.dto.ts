import { IsNotEmpty } from 'class-validator';

export class CreatePagoDto {
  areaId: number;
  totalImporte: number;
  totalEmpleado: number;
  periodoMes: number;
}
