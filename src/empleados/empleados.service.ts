import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDTO } from './dto/update-empleado.dto';
import { Empleado } from './entities/empleado.entity';
import { Actividad } from './entities/actividad.entity';
import { Area } from 'src/area/entities/area.entity';
import { log } from 'console';

@Injectable()
export class EmpleadosService {
  logger = new Logger();
  constructor(
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,
    @InjectRepository(Actividad)
    private readonly actividadRepository: Repository<Actividad>,
  ) {}

  async findAll() {
    return await this.empleadoRepository.find({
      relations: ['actividad', 'actividad.area'],
    });
  }

  async findByDni(dni: string): Promise<Empleado> {
      const empleado = await this.empleadoRepository.findOne({
      where: { dni: dni },
      relations: ['actividad', 'actividad.area'],
    });
    return empleado;
  }

  async findById(id: number): Promise<Empleado> {
    this.logger.log('finByID');
    const empleado = await this.empleadoRepository.findOne({
      where: { id: id }, // Condición de búsqueda
      relations: ['actividad'], // Cargar la relación actividad
    });
    return empleado;
  }

  async findByArea(id: string): Promise<Empleado[]> {
    const empleados = await this.empleadoRepository
      .createQueryBuilder('empleado')
      .innerJoin('empleado.actividad', 'actividad')
      .leftJoin('actividad.area', 'area')
      .where('actividad.area.id = :id', { id })
      .select([
        'empleado.id',
        'empleado.nombre',
        'empleado.dni',
        'empleado.cuil',
       // 'empleado.direccion',
        'actividad.importe',
        'actividad.ocupacion',
        'actividad.nroCuenta', // Asegúrate de usar el nombre correcto de la propiedad en tu entidad TypeORM
        'actividad.nroConvenio',
        'area.id',
        'area.nombre', // Asegúrate de usar el nombre correcto de la propiedad en tu entidad TypeORM
      ])
      .getMany();

    return empleados;
    /*
    this.logger.log('Entre aca y lo veor en consola');
    const empleados = await this.empleadoRepository
      .createQueryBuilder('empleado')
      .innerJoinAndSelect('empleado.actividad', 'actividad')
      .leftJoinAndSelect('actividad.area', 'area', 'area.id = :id', { id })
      .where('area.id = :id', { id })
      .select([
        'empleado.id',
        'empleado.nombre',
        'empleado.dni',
        'empleado.cuil',
        'empleado.direccion',
        'actividad.id',
        'actividad.importe',
     //   'actividad.ocupacion',
        'actividad.nro_convenio',
    //    'actividad.nro_cuenta',
   //     'area.id',
   //     'area.nombre',
      ])
      .getMany();
      this.logger.log(JSON.stringify(empleados));
    return empleados;
    */
  }

  // cambiar luego por Save
  async create(createEmpleadoDto: CreateEmpleadoDto) {
    const empleado = await this.guardarEmpleado(createEmpleadoDto);
    const actividad = await this.guardarctividad(empleado, createEmpleadoDto);
    log(empleado);
    log(actividad);
    return empleado;
  }

  async guardarEmpleado(
    createEmpleadoDto: CreateEmpleadoDto,
  ): Promise<Empleado> {
    if (!createEmpleadoDto.id) {
      const empleadoNuevo = new Empleado();
      empleadoNuevo.nombre = createEmpleadoDto.nombre;
      empleadoNuevo.dni = createEmpleadoDto.dni;
      empleadoNuevo.cuil = createEmpleadoDto.cuil;
      empleadoNuevo.fechaNacimiento = new Date(
        createEmpleadoDto.fechaNacimiento,
      );
      empleadoNuevo.direccion = createEmpleadoDto.direccion;
      empleadoNuevo.telefono = createEmpleadoDto.telefono;

      return await this.empleadoRepository.save(empleadoNuevo);
    } else {
      const empleadoExistente = await this.empleadoRepository.findOneBy({
        id: createEmpleadoDto.id,
      });
      if (!empleadoExistente) {
        // Manejar el caso en que el empleado no existe
        console.log('Error: El empleado no existe para el ID proporcionado.');
        return null; // O lanza una excepción según tus necesidades
      }

      empleadoExistente.nombre = createEmpleadoDto.nombre;
      empleadoExistente.dni = createEmpleadoDto.dni;
      empleadoExistente.cuil = createEmpleadoDto.cuil;
      empleadoExistente.fechaNacimiento = new Date(
        createEmpleadoDto.fechaNacimiento,
      );
      empleadoExistente.direccion = createEmpleadoDto.direccion;
      empleadoExistente.telefono = createEmpleadoDto.telefono;
      return await this.empleadoRepository.save(empleadoExistente);
    }
  }

  async guardarctividad(empleado: Empleado, createEmpleadoDto: CreateEmpleadoDto): Promise<Actividad> {
   // const area = new Area();
   // area.id = createEmpleadoDto.actividad.area.id;
   // area.nombre = createEmpleadoDto.actividad.area.nombre;

    const actividadExistente = await this.actividadRepository.findOne({
      where: { empleado: { id: empleado.id } },
    });

    if (actividadExistente) {
      actividadExistente.importe = createEmpleadoDto.actividad.importe;
      actividadExistente.ocupacion = createEmpleadoDto.actividad.ocupacion;
      // actividadExistente.area = area;
      actividadExistente.area = createEmpleadoDto.actividad.area;
      return await this.actividadRepository.save(actividadExistente);
    } else {
      const actividadNueva = new Actividad();
      actividadNueva.importe = createEmpleadoDto.actividad.importe;
      actividadNueva.ocupacion = createEmpleadoDto.actividad.ocupacion;
      actividadNueva.empleado = empleado;
      //actividadNueva.area = area;
      actividadNueva.area = createEmpleadoDto.actividad.area;
      return await this.actividadRepository.save(actividadNueva);
    }
  }
}
