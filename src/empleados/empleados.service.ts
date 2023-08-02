import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDTO } from './dto/update-empleado.dto';
import { Empleado } from './entities/empleado.entity';
import { Actividad } from './entities/actividad.entity';
import { Area } from 'src/area/entities/area.entity';

@Injectable()
export class EmpleadosService {
  logger = new Logger();
  constructor(
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,
    @InjectRepository(Actividad)
    private readonly empleadoactividadRepository: Repository<Actividad>,
  ) {}

  async create(createEmpleadoDto: CreateEmpleadoDto) {
    const empleado = await this.saveEmpleado(createEmpleadoDto);
    await this.saveActividad(empleado.id, createEmpleadoDto.actividad);
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDTO) {
    this.logger.log(updateEmpleadoDto);
    /*
    const empleado = this.empleadoRepository.create(updateEmpleadoDto);
    await this.empleadoRepository.update({ id }, empleado);
    return await this.empleadoRepository.findOne({ id });
    */
  }
  async remove(id: number) {
    return await this.empleadoRepository.delete({ id });
    // armar control para ver si tiene que devolver true o false
  }
  async findAll() {
    this.logger.log('Fin em ALL empleado service!');
    return await this.empleadoRepository.find();
    /*
    return await this.empleadoRepository.find({
      relations: ['area'],
    });
    */
  }

  async saveEmpleado(createEmpleadoDto: any) {
    const empleado = new Empleado();
    empleado.nombre = createEmpleadoDto.nombre;
    empleado.dni = createEmpleadoDto.dni;
    empleado.cuil = createEmpleadoDto.cuil;
    empleado.fechaNacimiento = new Date(createEmpleadoDto.fechaNacimiento);
    empleado.direccion = createEmpleadoDto.direccion;

    return await this.empleadoRepository.save(empleado);
  }

  async saveActividad(empleadoId: number, createEmpleadoDto: any) {

    this.logger.log(createEmpleadoDto)
 
    const empleado = await this.empleadoRepository.findOne(empleadoId);
    if (!empleado) {
      this.logger.log('No se encontro empleado con el id: ', empleadoId);
      return;
    }

    const area = new Area();
    area.id = createEmpleadoDto.area.id;
    area.nombre = createEmpleadoDto.area.nombre;

    const actividad = new Actividad();
    actividad.salario = createEmpleadoDto.salario;
    actividad.ocupacion = createEmpleadoDto.ocupacion;
    actividad.area = area;
    actividad.empleado = empleado;

    return await this.empleadoactividadRepository.save(actividad);
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
    const empleado = await this.empleadoRepository.findOne(id, {
      relations: ['area'],
    });
    console.log('empleado findByid');
    console.log(empleado);
    return empleado;
  }

  async findByArea(id: string) {
    const empleados = await this.empleadoRepository
      .createQueryBuilder('empleado')
      .innerJoinAndSelect('empleado.actividad', 'actividad')
      .leftJoinAndSelect('actividad.area', 'area', 'area.id = :id', { id })
      .where('area.id = :id', { id })
      .select([
        'empleado.id',
        'empleado.nombre',
        'empleado.dni',
        'actividad.salario',
        'actividad.ocupacion',
        'area.id',
        'area.nombre',
      ])
      .getMany();
    return empleados;
  }
}
