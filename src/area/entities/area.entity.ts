import { Empleado } from "src/empleados/entities/empleado.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
// @Entity('Areas')
@Entity()
export class Area {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 120})
    nombre: string;

    @OneToMany( () => Empleado, (empleado) => empleado.area )
    empleados: Empleado;
    
    @CreateDateColumn({ type: "timestamp"})
    created_at: Date;
    
    @UpdateDateColumn({ type: "timestamp" })
    public updated_at: Date;
}
