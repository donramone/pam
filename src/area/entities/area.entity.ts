import { Acreditacion } from '../../acreditaciones/entities/acreditacion.entity';
// import { Empleado } from '../../empleados/entities/empleado.entity';
import { Actividad } from '../../empleados/entities/actividad.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// @Entity('Areas')
@Entity()
export class Area {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 120 })
  nombre: string;

  @OneToMany(() => Acreditacion, (acreditacion) => acreditacion.area)
  acreditaciones: Acreditacion[];

  
  @OneToMany(() => Actividad, actividad => actividad.area)
  empleados: Actividad[];

 // @OneToMany(() => EmpleadoDetalleTrabajo, (empleado) => empleado.area)
 // empleados: EmpleadoDetalleTrabajo;

 // EmpleadoDetalleTrabajo


 
//  @OneToMany(() => Empleado, (empleado) => empleado.area)
//  empleados: Empleado;

/*
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
  */
}
