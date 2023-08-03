
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Acreditacion } from './acreditacion.entity';
import { Empleado } from '../../empleados/entities/empleado.entity';



@Entity()
export class AcreditacionEmpleado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  salario: number;

  @ManyToOne(() => Acreditacion, acreditacion => acreditacion.acreditacionEmpleados)
  @JoinColumn({ name: 'acreditacionID' })
  acreditacion: Acreditacion;

  @ManyToOne(() => Empleado, empleado => empleado.acreditacionEmpleados,{ nullable: false })
  @JoinColumn({ name: 'empleadoID' })
  empleado: Empleado


  @Column({ nullable: false })
  empleadoID: number; 
  
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}



