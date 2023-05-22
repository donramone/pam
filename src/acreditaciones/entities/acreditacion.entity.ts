import { AcreditacionEmpleado } from './acreditacionEmpleado.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';



@Entity({ name: 'acreditacion' })
export class Acreditacion{
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

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

 //  @OneToMany(() => AcreditacionEmpleado, acreditacionEmpleado => acreditacionEmpleado.acreditacion)
 //  acreditacionEmpleados: AcreditacionEmpleado[];
}
