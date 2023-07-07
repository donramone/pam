//import { Empleado } from 'src/empleados/entities/empleado.entity';
/*
import { Empleado } from 'src/empleados/entities/empleado.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  areaID: number;

  @Column({ name: 'total_importe', nullable: true })
  totalImporte: number;

  @Column({ name: 'total_empleados', nullable: true })
  totalEmpleados: number;

  @Column({ name: 'periodo_mes', nullable: true })
  periodoMes: number;

  @ManyToOne(() => Empleado, emp => emp.pagos )
  empleado: Empleado[];


    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
  
}
*/