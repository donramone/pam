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
  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    await this.EmpleadoRepository.update({ id }, updateEmpleadoDto);
    return await this.EmpleadoRepository.findOne({ id });

  }
  async findAll() {
    return await this.EmpleadoRepository.find( {
      relations: ['area'] } )
  }
  async findOne(id: number): Promise<Empleado> {
    const empleado = await this.EmpleadoRepository.findOne(id, {
      relations: ['area'],
    });
    return empleado;
  }
  async findByDni(dni: string): Promise<Empleado> {
    const empleado = await this.EmpleadoRepository.findOne(
      {dni: dni}, {
      relations: ['area'],
      }
    );
    return empleado;
  }
  async findByArea(id: number) {
    const empleados =  await this.EmpleadoRepository.createQueryBuilder('empleado')
    .where('area.id = :id' , { id: id })
    // .where({ id: id})
    .select(['empleado.id', 'empleado.nombre', 'empleado.salario', 'area.id', 'area.nombre'])
    .leftJoin('empleado.area', 'area')  
    .getMany();
    return empleados;
  }
  async remove(id: number) {
    await this.EmpleadoRepository.delete({ id });
    // armar control para ver si tiene que devolver true o false
    return { deleted: true };
  }
}
