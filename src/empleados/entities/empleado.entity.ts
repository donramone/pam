import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Empleado {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 120})
    nombre: string;

    @Column({ type: "varchar", length: 8})
    dni: string;

    @Column({ type: "date" })
    fecha_nacimiento: Date;

    @Column({ type: "varchar", length: 180 })
    direccion: string;
    
    @Column({ type: "varchar", length: 12 })
    telefono: string;
    
    @Column({ type: "varchar", length: 50 })
    email: string;

    @Column({ type: "varchar", length: 75 })
    ocupacion: string;

    @Column({ type: "double" })
    salario: number;

    // area: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;
    
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;
}
