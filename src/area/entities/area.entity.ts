import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
// @Entity('Areas')
@Entity()
export class Area {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 120})
    nombre: string;

    @CreateDateColumn({ type: "timestamp"})
    createdAt: Date;
}
