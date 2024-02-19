
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Acreditacion } from './acreditacion.entity';
import { Empleado } from '../../empleados/entities/empleado.entity';



export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}

@Entity()
@Unique(['acreditacion', 'empleado'])
export class AcreditacionEmpleado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new ColumnNumericTransformer() })
  importe: number;

  @Column({  name: 'nro_cuenta', nullable: false, type: 'varchar', default:"0000000000000000"}) 
  nroCuenta: string;


  @ManyToOne(() => Acreditacion, acreditacion => acreditacion.acreditacionEmpleados,{ nullable: false })
  @JoinColumn({ name: 'acreditacion_id' })
  acreditacion: Acreditacion;


  @ManyToOne(() => Empleado, empleado => empleado.acreditacionEmpleados,{ nullable: false })
  @JoinColumn({ name: 'empleado_id', })
  empleado: Empleado

  
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
  
  @Column({ default: true })
  is_active: boolean;
}



