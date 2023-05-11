import { IsNotEmpty } from 'class-validator';

export class CreatePagoDto {
  @IsNotEmpty({ message: 'Debe ingresar un monto' })
  monto: number;
  periodo: string;
  empleadoId: number;
}
