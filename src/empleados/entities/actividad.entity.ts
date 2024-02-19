import { Area } from '../../area/entities/area.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Empleado } from './empleado.entity';

/// ColumnNumericTransformer
export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}

@Entity()
export class Actividad {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: 'varchar',
    nullable: true,
    default:"No especifica"
  })
  ocupacion: string;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new ColumnNumericTransformer() })
  importe: number;

  @Column({ nullable: false, type: 'boolean', default:true })
  estado: boolean;

  @Column({ nullable: false, name: 'nro_cuenta' ,type: 'varchar', default:"0000000000000000"}) 
  nroCuenta: string;

  @Column({ nullable: false,name: 'nro_convenio',  type: 'varchar', default:"500117PP"}) 
  nroConvenio: string;

  @OneToOne(() => Empleado, (empleado) => empleado.actividad )
  @JoinColumn({ name: 'empleado_id' })
  empleado: Empleado;

  @ManyToOne(() => Area, area => area.actividad, { nullable: false })
  @JoinColumn({ name: 'area_id' })
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

  @Column({ default: true })
  is_active: boolean; 
}
