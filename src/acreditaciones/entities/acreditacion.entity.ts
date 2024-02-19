import { Area } from '../../area/entities/area.entity';
import { AcreditacionEmpleado } from './acreditacionEmpleado.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}
@Entity({ name: 'acreditacion' })
export class Acreditacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'total_importe',
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  totalImporte: number;

  @Column({ name: 'total_empleados', nullable: true })
  totalEmpleados: number;

  @Column({
    name: 'nro_convenio',
    nullable: false,
    type: 'varchar',
    default: '500117PP',
  })
  nroConvenio: string;

  @Column({ name: 'periodo', nullable: true })
  periodo: string;

  @ManyToOne(() => Area, (area) => area.acreditaciones)
  @JoinColumn({ name: 'area_id' })
  area: Area;

  @OneToMany(
    () => AcreditacionEmpleado,
    (acreditacionEmpleado) => acreditacionEmpleado.acreditacion
  )
  acreditacionEmpleados: AcreditacionEmpleado[];

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
