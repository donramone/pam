import { Area } from '../../area/entities/area.entity';
import { Pago } from '../../pagos/entities/pago.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Empleado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 120 })
  nombre: string;

  @Column({ type: 'varchar', length: 8 })
  dni: string;

  @Column({ type: 'varchar', length: 11 })
  cuil: string;

  @Column({ type: 'timestamp', name: 'fecha_nacimiento' })
  fechaNacimiento: Date;

  @Column({ type: 'varchar', length: 180 })
  direccion: string;

  @Column({ type: 'varchar', length: 12, nullable: true })
  telefono: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  email: string;

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

  @OneToMany(() => Pago, (pago) => pago.empleado)
  pagos: Pago;

  @ManyToOne(() => Area, (area) => area.empleados)
  area: Area;

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
