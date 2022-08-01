import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Empleado } from './entities/empleado.entity';

@Injectable()
export class EmpleadosService {
  logger = new Logger();
  constructor(
    @InjectRepository(Empleado)
    private readonly EmpleadoRepository: Repository<Empleado>,
  ) {}

  async create(createEmpleadoDto: CreateEmpleadoDto) {
    this.logger.log('createee loggerrr');
    const empleado = this.EmpleadoRepository.create(createEmpleadoDto);
    await this.EmpleadoRepository.save(empleado);
    this.logger.log('en el service guardo');
    return empleado;
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    console.log('Update emppleado service ID ', id, ' DTO ', updateEmpleadoDto);
    await this.EmpleadoRepository.update({ id }, updateEmpleadoDto);
    return await this.EmpleadoRepository.findOne({ id });
  }
  async remove(id: number) {
    return await this.EmpleadoRepository.delete({ id });
    // armar control para ver si tiene que devolver true o false
  }
  async findAll() {
    this.logger.log('Fin em ALL empleado service!');
    console.log('find em ALL');
    return await this.EmpleadoRepository.find({
      relations: ['area'],
    });
  }
/*
  async findByDni(dni: string): Promise<Empleado> {
    console.log('finByDNI');

    const empleado = await this.EmpleadoRepository.findOne(
      { dni: dni },
      {
        relations: ['area'],
      },
    );
    return empleado;
  }
*/
  async findById(id: string): Promise<Empleado> {
    console.log('find by id service');

    const empleado = await this.EmpleadoRepository.findOne(id, {
      relations: ['area'],
    });
    return empleado;
  }

  async findByArea(id: string) {
    console.log(`FinByArea service ${id}`);
    const empleados = await this.EmpleadoRepository.createQueryBuilder(
      'empleado',
    )
      .where('area.id = :id', { id: id }) // .where({ id: id})
      .select([
        'empleado.id',
        'empleado.nombre',
        'empleado.dni',
        'empleado.salario',
        'area.id',
        'area.nombre',
      ])
      .leftJoin('empleado.area', 'area')
      .getMany();
    console.log('FindByArea ', empleados);

    return empleados;
  }
}
