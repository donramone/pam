import { Acreditacion } from '../../acreditaciones/entities/acreditacion.entity';
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
  acreditaciones?: Acreditacion[];

  
  @OneToMany(() => Actividad, actividad => actividad.area)
  actividad?: Actividad[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at?: Date;
  
  @Column({ default: true })
  is_active?: boolean;

}
