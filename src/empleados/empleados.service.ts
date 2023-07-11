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
    const area = new Area();
    area.id = createEmpleadoDto.area.id;
    area.nombre = createEmpleadoDto.area.nombre;
  
    const empleado = new Empleado();
    empleado.nombre = createEmpleadoDto.nombre;
    empleado.dni = createEmpleadoDto.dni;
    empleado.cuil = createEmpleadoDto.cuil;
    empleado.fechaNacimiento = new Date(createEmpleadoDto.fechaNacimiento);
    empleado.direccion = createEmpleadoDto.direccion;
  
    const newEmpleado = await this.empleadoRepository.save(empleado);
  
    const actividad = new Actividad();
    actividad.salario = createEmpleadoDto.actividad.salario;
    actividad.ocupacion = createEmpleadoDto.actividad.ocupacion;
    actividad.area = area;
    actividad.empleado = newEmpleado;
  
    const newActividad = await this.empleadoactividadRepository.save(actividad);
    return newEmpleado;
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
