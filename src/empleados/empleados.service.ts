import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDTO } from './dto/update-empleado.dto';
import { Empleado } from './entities/empleado.entity';
import { Actividad } from './entities/actividad.entity';

@Injectable()
export class EmpleadosService {
  logger = new Logger();
  constructor(
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,
    @InjectRepository(Actividad)
    private readonly empleadoactividadRepository: Repository<Actividad>,
  ) {}

  async create(empleadoDto: CreateEmpleadoDto) {

    /*

    const empleado = this.EmpleadoRepository.create(createEmpleadoDto);
    this.logger.log('El nuevo empleado es');
    this.logger.log(JSON.stringify(empleado));
    await this.EmpleadoRepository.save(empleado);
    return empleado;
    */
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

  async crear(body:any){
    /// Probar no guardar el actividad

    this.logger.log(body.nombre, body.ocupacion);
    
    const actividad = new Actividad();
    actividad.salario = body.salario;
    actividad.ocupacion = body.ocupacion;
    const newActividad = this.empleadoactividadRepository.save(actividad);
    
    const emp = new Empleado();
    emp.nombre = body.nombre;
    emp.dni = body.dni;
    const newEmp =  this.empleadoRepository.save(emp);



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
    const empleados = await this.empleadoRepository.createQueryBuilder(
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
