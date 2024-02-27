import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AcreditacionEmpleado } from './entities/acreditacionEmpleado.entity';
import { Acreditacion } from './entities/acreditacion.entity';
import { CreateAcreditacionDTO } from './dto/create -acreditaciones.dto';
import { AcreditacionResponse } from './Interfaces/acreditacion.response';
import { log } from 'console';

@Injectable()
export class AcreditacionesService {
  logger = new Logger();
  constructor(
    @InjectRepository(Acreditacion)
    private readonly acreditacionRepository: Repository<Acreditacion>,
    @InjectRepository(AcreditacionEmpleado)
    private readonly acreditacionEmpleadoRepository: Repository<AcreditacionEmpleado>,
  ) {}

  async createAcreditacion(dto: any): Promise<any> {
    this.logger.log(dto)
    const { area, totalImporte, totalEmpleados, periodo, nroConvenio, acreditacionEmpleados } = dto;

    const acreditacion = this.acreditacionRepository.create({
      area: area,
      totalImporte: totalImporte,
      totalEmpleados: totalEmpleados,
      periodo: periodo,
      nroConvenio: nroConvenio,
    });


    const acreditacionGuardada = await this.acreditacionRepository.save(acreditacion);

    // Mapea y guarda los registros de AcreditacionEmpleado
    const acreditacionEmpleadoEntities = acreditacionEmpleados.map((acreditacionEmpleadoDto: any) => {
      return this.acreditacionEmpleadoRepository.create({
        importe: acreditacionEmpleadoDto.importe,
        nroCuenta: acreditacionEmpleadoDto.nroCuentaBancaria,
        acreditacion: acreditacionGuardada,
        empleado: { id: acreditacionEmpleadoDto.empleado.id },
      });
    });

    await this.acreditacionEmpleadoRepository.save(acreditacionEmpleadoEntities);

    return acreditacionGuardada;
  
  }
  

  

  async findAll(): Promise<Acreditacion[]>{
    return await this.acreditacionRepository.find();
  }

  async findAcreditacionPorArea(id: number): Promise<Acreditacion[]> {
    const acreditacion = await this.acreditacionRepository
      .createQueryBuilder('acreditacion') 
      .where('acreditacion.area_id = :area_id', { area_id: id }) 
      .getMany();
    return acreditacion;
  }

  async findAcreditacionPorIdEmpleado(id: number) {
    const acreditaciones = await this.acreditacionRepository
      .createQueryBuilder('acreditacion')
      .innerJoin('acreditacion.acreditacionEmpleados', 'acreditacionEmpleado')
      .leftJoin('acreditacionEmpleado.empleado', 'empleado')
      .leftJoin('empleado.actividad', 'actividad')
      .leftJoin('acreditacion.area', 'area') // Unión con la tabla de área
      .select([
        'acreditacion.id',
        'acreditacion.created_at',
        'acreditacionEmpleado.salario',
        'empleado.nombre',
        'empleado.cuil',
        'actividad.ocupacion',
        'area.nombre ', // Seleccionar el campo "nombre" de la tabla "area"
      ])
      .where('empleado.id = :empleadoID', { empleadoID: id })
      .getMany();

    // Reorganizar la estructura de la respuesta
    const acreditacionNormalizada = {
      empleado: {
        nombre: acreditaciones[0].acreditacionEmpleados[0].empleado.nombre,
        cuil: acreditaciones[0].acreditacionEmpleados[0].empleado.cuil,
        ocupacion:
          acreditaciones[0].acreditacionEmpleados[0].empleado.actividad
            .ocupacion,
      },
      acreditaciones: acreditaciones.map((acreditacion) => ({
        id: acreditacion.id,
        created_at: acreditacion.created_at,
        salario: acreditacion.acreditacionEmpleados[0].importe,
      })),
    };

    return acreditacionNormalizada;
  }

  async findAcreditacionPorId(id: number):Promise<Acreditacion> {

    try {
      // Realizar la consulta
      const acreditacion = await this.acreditacionRepository.findOneBy({ id });
  
      // Imprimir en consola la información de la acreditación
      this.logger.log('Acreditacion encontrada:', acreditacion);
  
      // Verificar si la acreditación tiene empleados y actividad
      if (acreditacion && acreditacion.acreditacionEmpleados) {
        // Imprimir en consola la información de los empleados y su actividad
        acreditacion.acreditacionEmpleados.forEach((acreditacionEmpleado) => {
          if (acreditacionEmpleado.empleado && acreditacionEmpleado.empleado.actividad) {
            this.logger.log(`Empleado ${acreditacionEmpleado.empleado.nombre}:`);
            this.logger.log(' - Ocupación:', acreditacionEmpleado.empleado.actividad.ocupacion);
          } else {
            this.logger.log('Empleado sin información de actividad:', acreditacionEmpleado.empleado);
          }
        });
      }
  
      // Devolver la acreditación
      return acreditacion;
    } catch (error) {
      // Capturar y manejar cualquier error
      console.error('Error al buscar la acreditación por ID:', error);
      throw error;
    }
     // const acreditacion = await this.acreditacionRepository.findOneBy({id});
     // return acreditacion;
  }

  async findOneTest(acreditacionID: number): Promise<AcreditacionEmpleado[]>{
       return this.acreditacionEmpleadoRepository
      .createQueryBuilder('acreditacionEmpleado')
      .where('acreditacionEmpleado.acreditacionID = :acreditacion_id', { acreditacionID })
      .getMany();
}

  async findAcreditacionPorDniEmpleado(dni: string) {
    const acreditaciones = await this.acreditacionRepository
    
    .createQueryBuilder('acreditacion')
    .innerJoin('acreditacion.acreditacionEmpleados', 'acreditacionEmpleado')
    .leftJoin('acreditacionEmpleado.empleado', 'empleado')
    .leftJoin('empleado.actividad', 'actividad')
    .leftJoin('acreditacion.area', 'area') // Unión con la tabla de área
    .select([
      'acreditacion.id',
      'acreditacion.created_at',
      'acreditacionEmpleado.importe',
      'empleado.nombre',
      'empleado.cuil',
      'actividad.ocupacion',
      'area.nombre ', // Seleccionar el campo "nombre" de la tabla "area"
    ])
    .where('empleado.dni = :dni', { dni: dni})
    .getMany();

  // Reorganizar la estructura de la respuesta
  const acreditacionNormalizada = {
    empleado: {
      nombre: acreditaciones[0].acreditacionEmpleados[0].empleado.nombre,
      cuil: acreditaciones[0].acreditacionEmpleados[0].empleado.cuil,
      ocupacion:
        acreditaciones[0].acreditacionEmpleados[0].empleado.actividad
          .ocupacion,
    },
    acreditaciones: acreditaciones.map((acreditacion) => ({
      id: acreditacion.id,
      created_at: acreditacion.created_at,
      salario: acreditacion.acreditacionEmpleados[0].importe,
    })),
  };

  return acreditacionNormalizada;
  }

  async findByDni2(dni: string): Promise<any[]> {
    const empleadosConAcreditaciones = await this.acreditacionEmpleadoRepository
    .createQueryBuilder('acreditacionEmpleado')
    .leftJoinAndSelect('acreditacionEmpleado.empleado', 'empleado')
    .where('empleado.dni = :dni', { dni: dni })
    .getMany();
    
    return empleadosConAcreditaciones
  }
  
  async getEmpleadosByNroAcreditacion(nroAcreditacion: number) {

    const acreditacion = await this.acreditacionRepository
    .createQueryBuilder('acreditacion')
    .leftJoinAndSelect(
      'acreditacion.acreditacionEmpleados',
      'acreditacion_empleado',
    )
    .leftJoinAndSelect('acreditacion.area', 'area')
    .leftJoinAndSelect('acreditacion_empleado.empleado', 'empleado')
    .select([
      'acreditacion.id',
      'acreditacion.areaID',
      'area.nombre',
      'acreditacion.totalImporte',
      'acreditacion.totalEmpleados',
      'acreditacion.periodoMes',
      'acreditacion.nro_convenio',
      'acreditacion_empleado.importe',
      'acreditacion_empleado.nro_cuenta',
      'empleado.id',
      'empleado.nombre',
      'empleado.cuil',
    ])
    .where('acreditacion.id = :nroAcreditacion', { nroAcreditacion })
    .getOne();

  if (acreditacion) {
    // Transformar la respuesta para tener id, nombre y cuil en el mismo nivel que salario
    const acreditacionTransformada = {
      ...acreditacion,
      acreditacionEmpleados: acreditacion.acreditacionEmpleados.map((acreditacionEmpleado) => ({
        salario: acreditacionEmpleado.importe,
        nroCuentaBancaria: acreditacionEmpleado.nroCuenta,
        id: acreditacionEmpleado.empleado.id,
        nombre: acreditacionEmpleado.empleado.nombre,
        cuil: acreditacionEmpleado.empleado.cuil,
      })),
    };

    return acreditacionTransformada;
  } else {
    return null; // Devolver null si no se encuentra la acreditación
  }
  }

  async getEmpleadosByNroAcreditacion2(nroAcreditacion: number): Promise<AcreditacionResponse> {
    const acreditacion = await this.acreditacionRepository
    .createQueryBuilder('acreditacion')
    .leftJoinAndSelect('acreditacion.acreditacionEmpleados', 'acreditacionEmpleado')
    .leftJoinAndSelect('acreditacion.area', 'area') 
    .leftJoinAndSelect('acreditacionEmpleado.empleado', 'empleado')
    .leftJoinAndSelect('empleado.actividad', 'actividad') // Agregar esta línea para incluir la actividad
    .where('acreditacion.id = :nroAcreditacion', { nroAcreditacion })
    .getOne();

  if (!acreditacion) {
    // Manejo de error si no se encuentra la acreditación
    throw new NotFoundException('Acreditación no encontrada');
  }

  return acreditacion;

    /*
    const acreditacion = await this.acreditacionRepository
      .createQueryBuilder('acreditacion')
      .leftJoinAndSelect('acreditacion.acreditacionEmpleados', 'acreditacionEmpleado')
      .leftJoinAndSelect('acreditacion.area', 'area') 
      .leftJoinAndSelect('acreditacionEmpleado.empleado', 'empleado')
      .where('acreditacion.id = :nroAcreditacion', { nroAcreditacion })
      .getOne();
  
    if (!acreditacion) {
      // Manejo de error si no se encuentra la acreditación
      throw new NotFoundException('Acreditación no encontrada');
    }
  
    return acreditacion;

    */
  }

}
