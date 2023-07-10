import { AcreditacionEmpleado } from 'src/acreditaciones/entities/acreditacionEmpleado.entity';
import { Area } from '../../area/entities/area.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Empleado } from './empleado.entity';

@Entity()
export class Actividad {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  ocupacion: string;

  @Column({ nullable: false, type: 'float', default: 0.0 })
  salario: number;
/*
  @Column({ nullable: false, type: 'boolean' })
  estado: boolean;
*/
  @OneToOne(() => Empleado, (empleado) => empleado.actividad)
  @JoinColumn()
  empleado: Empleado;

  /*
  @OneToMany(() => AcreditacionEmpleado, acreditacionEmpleado => acreditacionEmpleado.empleado)
  acreditacionEmpleados: AcreditacionEmpleado[];
*/

  // @ManyToOne(() => Area, (area) => area.empleados)
  // area: Area;
  /*
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
  */
}
