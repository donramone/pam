import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Empleado } from './entities/empleado.entity';

@Injectable()
export class EmpleadosService {
  constructor(
    @InjectRepository(Empleado)
    private readonly EmpleadoRepository: Repository<Empleado>
  ){}

  async create(createEmpleadoDto: CreateEmpleadoDto) {
    const empleado = this.EmpleadoRepository.create(createEmpleadoDto);
    await this.EmpleadoRepository.save(empleado);
    return empleado;
  }

  async findAll() {
    return await this.EmpleadoRepository.find()
  }

  async findOne(id: number) {
    const empleado = await this.EmpleadoRepository.findOne(id);
    return empleado;
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    await this.EmpleadoRepository.update({ id }, updateEmpleadoDto);
    return await this.EmpleadoRepository.findOne({ id });

  }

  async remove(id: number) {
    await this.EmpleadoRepository.delete({ id });
    // armar control para ver si tiene que devolver true o false
    return { deleted: true };
  }
}
