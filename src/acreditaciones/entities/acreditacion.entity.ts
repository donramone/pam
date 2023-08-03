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

@Entity({ name: 'acreditacion' })
export class Acreditacion {
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

  @ManyToOne(() => Area, (area) => area.acreditaciones)
  @JoinColumn({ name: 'areaID' })
  area: Area;

  @OneToMany(
    () => AcreditacionEmpleado,
    (acreditacionEmpleado) => acreditacionEmpleado.acreditacion,
    {
      cascade: true,
    },
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
}
