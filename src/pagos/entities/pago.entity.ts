import { Empleado } from 'src/empleados/entities/empleado.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'float', default: 0.0 })
  monto: number;

  @Column({ nullable: false, type: 'varchar' })
  periodo: string;

  @ManyToOne(() => Empleado, (empleado: Empleado) => empleado.pagos, {
    onDelete: 'CASCADE',
  })
  empleado: Empleado;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;
}
