import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Acreditaciones {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  empleadoID: number;

  @Column({ nullable: true })
  areaID: number;

  @Column({ nullable: true })
  salario: number;

  @Column({ nullable: true })
  totalEmpleados: number;

  @Column({ nullable: true })
  periodoMes: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;
}
