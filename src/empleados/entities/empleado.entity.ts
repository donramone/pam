import { AcreditacionEmpleado } from 'src/acreditaciones/entities/acreditacionEmpleado.entity';
import { Actividad } from './actividad.entity';
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


@Entity()
export class Empleado {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 120, nullable: false  })
  nombre: string;

  @Column({ type: 'varchar', length: 8, nullable: false  })
  dni: string;

  @Column({ type: 'varchar', length: 11, nullable: false  })
  cuil?: string;

  @Column({ type: 'date', name: 'fecha_nacimiento', nullable: true  })
  fechaNacimiento?: Date;

  @Column({ type: 'varchar', length: 180, nullable: true  })
  direccion?: string;

  @Column({ type: 'varchar', length: 12, nullable: true })
  telefono?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  email?: string;

  @OneToOne(() => Actividad, actividad => actividad.empleado)
  actividad: Actividad;

  
  @OneToMany(() => AcreditacionEmpleado, acreditacionEmpleado => acreditacionEmpleado.empleado)
  acreditacionEmpleados: AcreditacionEmpleado[];
  
}
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

