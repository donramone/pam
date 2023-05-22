import { Acreditacion } from './acreditacion.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';



@Entity()
export class AcreditacionEmpleado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  empleadoID: number;

  @Column({ nullable: true })
  areaID: number;

  @Column({ nullable: true })
  salario: number;

  @Column({ nullable: true })
  periodoMes: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

 // @ManyToOne(() => Acreditacion, a => a.acreditacionEmpleados)
//  acreditacion: Acreditacion;
}
