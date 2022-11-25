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
    this.logger.log('lo que llega');
    this.logger.log(createEmpleadoDto);
    const empleado = this.EmpleadoRepository.create(createEmpleadoDto);
    this.logger.log('El nuevo empleado es');
    this.logger.log(JSON.stringify(empleado));
    await this.EmpleadoRepository.save(empleado);
    return empleado;
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    this.logger.log(updateEmpleadoDto);
    const empleado = this.EmpleadoRepository.create(updateEmpleadoDto);
    await this.EmpleadoRepository.update({ id }, empleado);
    return await this.EmpleadoRepository.findOne({ id });
  }
  async remove(id: number) {
    return await this.EmpleadoRepository.delete({ id });
    // armar control para ver si tiene que devolver true o false
  }
  async findAll() {
    this.logger.log('Fin em ALL empleado service!');
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
    const empleado = await this.EmpleadoRepository.findOne(id, {
      relations: ['area'],
    });
    console.log('empleado findByid');
    console.log(empleado);
    return empleado;
  }

  async findByArea(id: string) {
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
    return empleados;
  }
}
