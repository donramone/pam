import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Actividad } from "./entities/actividad.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Empleado } from "./entities/empleado.entity";

@Injectable()
export class ActividadService {
  logger = new Logger();
  constructor(
    @InjectRepository(Actividad)
    private actividadRepository: Repository<Actividad>,
    @InjectRepository(Empleado)
    private empleadoRepository: Repository<Empleado>,
  ) {}

  async updateImporte(actividadId: number, nuevoImporte: number): Promise<Actividad> {
    const actividad = await this.actividadRepository.findOne({
      where: { id: actividadId },
    });

    if (!actividad) {
      throw new NotFoundException(`Actividad con ID ${actividadId} no encontrada`);
    }

    actividad.importe = nuevoImporte;
    await this.actividadRepository.save(actividad);

    return actividad;
  }
  
  async updateSalarioOLD(empleadoId: number, nuevoImporte: number): Promise<Actividad> {
    const empleado = await this.empleadoRepository.findOne({
        where: {
            id: empleadoId
        }
    });
  
    if (!empleado) {
      throw new NotFoundException(`Empleado con ID ${empleadoId} no encontrado`);
    }
  
    if (!empleado.actividad) {
        throw new NotFoundException(`Actividad no encontrada para el Empleado con ID ${empleadoId}`);
      }

    this.logger.log(empleado.actividad.id)
    this.logger.log(empleado.actividad)
    // Buscar la actividad asociada al empleado
    const actividad = await this.actividadRepository.findOne({
      // where: { id: empleado.actividad.id },
      where: { id: 27 },
    });
  
    if (!actividad) {
      throw new NotFoundException(`Actividad para el Empleado con ID ${empleadoId} no encontrada`);
    }
  
    actividad.importe = nuevoImporte;
    await this.actividadRepository.save(actividad);
  
    return actividad;
  }
}