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
import { Actividad } from './actividad.entity';

@Entity()
export class Empleado {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 120, nullable: true  })
  nombre: string;

  @Column({ type: 'varchar', length: 8, nullable: true  })
  dni: string;
/*
 

  @Column({ type: 'varchar', length: 11, nullable: true  })
  cuil?: string;

  @Column({ type: 'timestamp', name: 'fecha_nacimiento', nullable: true  })
  fechaNacimiento?: Date;

  @Column({ type: 'varchar', length: 180, nullable: true  })
  direccion?: string;

  @Column({ type: 'varchar', length: 12, nullable: true })
  telefono?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  email?: string;
*/
  @OneToOne(() => Actividad, actividad => actividad.empleado)
  actividad: Actividad;

  
/*
  @Column({
    type: 'varchar',
    length: 75,
    nullable: true,
    default: 'No especifica',
  })
  ocupacion: string;

  @Column({ nullable: false, type: 'float', default: 0.0 })
  salario: number;

  @Column({ nullable: false, type: 'boolean' })
  estado: boolean;

  @OneToMany(() => AcreditacionEmpleado, acreditacionEmpleado => acreditacionEmpleado.empleado)
  acreditacionEmpleados: AcreditacionEmpleado[];

  @ManyToOne(() => Area, (area) => area.empleados)
  area: Area;


*/
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
