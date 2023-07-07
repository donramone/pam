import { Empleado } from 'src/empleados/entities/empleado.entity';
import { Acreditacion } from './acreditacion.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';



@Entity()
export class AcreditacionEmpleado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  empleadoID: number;

  @Column({ nullable: true })
  salario: number;

  @ManyToOne(() => Acreditacion, acreditacion => acreditacion.acreditacionEmpleados)
  @JoinColumn({ name: 'acreditacionID' })
  acreditacion: Acreditacion;

  @ManyToOne(() => Empleado, empleado => empleado.acreditacionEmpleados)
  @JoinColumn({ name: 'empleadoID' })
  empleado: Empleado

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
  
}
