import { Injectable, Logger } from '@nestjs/common';
import { UpdateAcreditacioneDto } from './dto/update-acreditaciones.dto';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AcreditacionEmpleado } from './entities/acreditacionEmpleado.entity';
import { Acreditacion } from './entities/acreditacion.entity';
import { CreateAcreditacionDTO } from './dto/create -acreditaciones.dto';

@Injectable()
export class AcreditacionesService {
  logger = new Logger();
  constructor(
    @InjectRepository(Acreditacion)
    private readonly acreditacionRepository: Repository<Acreditacion>,
    @InjectRepository(AcreditacionEmpleado)
    private readonly acreditacionEmpleadoRepository: Repository<AcreditacionEmpleado>,
  ) {}

  async createAcreditacion(dto: CreateAcreditacionDTO): Promise<Acreditacion> {
    this.logger.log('createAcreditacion - En el service va  aguardar', dto);

    const newAcreditacion = this.acreditacionRepository.create(dto);
    const savedAcreditacion = await this.acreditacionRepository.save(
      newAcreditacion,
    );

    for (const acreditacionEmpleadoData of dto.acreditacionEmpleadosData ) {
      const acreditacionEmpleado = new AcreditacionEmpleado();
      acreditacionEmpleado.acreditacion = savedAcreditacion;
      acreditacionEmpleado.empleadoID = acreditacionEmpleadoData.empleadoID;
      acreditacionEmpleado.salario = acreditacionEmpleadoData.salario;
     // acreditacionEmpleadoData.acreditacionID = savedAcreditacion.id;
      await this.acreditacionEmpleadoRepository.save(acreditacionEmpleado);
    }
     return savedAcreditacion;

    // Asignar el id de la Acreditacion a cada AcreditacionEmpleado
/*
    const acreditacionEmpleados = dto.acreditacionEmpleados.map((empleadoData) => {
      const acreditacionEmpleado = new AcreditacionEmpleado();
      acreditacionEmpleado.acreditacion = savedAcreditacion;
      acreditacionEmpleado.id = empleadoData.empleadoID;
      acreditacionEmpleado.salario = empleadoData.salario;
      return acreditacionEmpleado;
    });

         const acreditacionEmpleado = this.acreditacionEmpleadoRepository.create(
        acreditacionEmpleadoData,
      );
    return savedAcreditacion;
*/


  }

  async create(dto: CreateAcreditacionDTO) {
    /*
    const { totalImporte, totalEmpleados, periodoMes, acreditacionEmpleados, area } = dto;

    const acreditacion = new Acreditacion();
    acreditacion.totalImporte = totalImporte;
    acreditacion.totalEmpleados = totalEmpleados;
    acreditacion.periodoMes = periodoMes;
    acreditacion.area = area;

    const savedAcreditacion = await this.acreditacionRepository.save(acreditacion);

    const acreditacionEmpleadoEntities = acreditacionEmpleados.map((item) => {
      const acreditacionEmpleado = new AcreditacionEmpleado();
      acreditacionEmpleado.empleadoID = item.empleadoID;
      acreditacionEmpleado.salario = item.salario;
      acreditacionEmpleado.acreditacion = savedAcreditacion;
      return acreditacionEmpleado;
    });

    await this.acreditacionEmpleadoRepository.save(acreditacionEmpleadoEntities);

    return savedAcreditacion;

    ******************************
*/
    // acreditacion.acreditacionEmpleados = createAcreditacionesDto;
    /*
    office es el  quee tiene el array de equipamentos
    const officeRepository = connection.getRepository(Office);
    const office = new Office();
    const equipment1 = new Equipment(); // and set your properties or make more instances

    office.equipment = [equipment1]; // or more instances
    await officeRepository.save(office);

   
    const acreditacionEmpleado = this.AcreditacionEmpleado.create(
      createAcreditacionesEmpleadoDto,
    );

    await this.AcreditacionEmpleado.save(acreditacionEmpleado);
    await this.AcreditacionesRepository.save(acreditacion);
    return acreditacion;
 */
  }

  async findAll() {
    return await this.acreditacionRepository.find();
  }

  async findByArea(id: number) {
    const acreditacion = await this.acreditacionRepository
      .createQueryBuilder('acreditacion') // 'acreditacion' es el alias de la tabla
      .where('acreditacion.areaID = :areaID', { areaID: id }) // Comparar el campo 'areaID' con el valor proporcionado
      //  .where('area.id = :id', { id: id }) // .where({ id: id})
      .getMany();
    return acreditacion;
  }

  async findOne(id: number) {
    //   const acreditacion = await this.AcreditacionesRepository.findOne(id);
    //   return acreditacion;
  }

  async getEmpleadosByNroAcreditacion(nroAcreditacion: number) {
    const acreditaciones = await this.acreditacionRepository
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
        'acreditacion_empleado.salario',
        'empleado.id',
        'empleado.nombre',
        'empleado.dni',
      ])
      .where('acreditacion.id = :nroAcreditacion', { nroAcreditacion })
      .getOne();

    return acreditaciones;

    /*
    
    

      const acreditacion = this.AcreditacionEmpleado
      .createQueryBuilder('acreditacion_empleado')
    //  .leftJoinAndSelect('acreditacion_empleado.acreditacion', 'acreditacion')
    //  .leftJoinAndSelect('acreditacion_empleado.empleado', 'empleado')
      .select([
        'acreditacion.id',
        'acreditacion.total_importe',
        'acreditacion.total_empleados',
        'acreditacion.periodo_mes',
        'acreditacion.created_at',
   //     'area.nombre',
   //     'empleado.nombre',
   //     'empleado.dni',
   //     'acreditacion_empleado.salario',
   //     'acreditacion_empleado.acreditacionID'
      ])
      .where('acreditacion.id = :nroAcreditacion', { nroAcreditacion })
      .getMany();
    
    return acreditacion;
 
    */
  }

  /*
  update(id: number, updateAcreditacioneDto: UpdateAcreditacioneDto) {
    return `This action updates a #${id} acreditacione`;
  }
*/
  remove(id: number) {
    return `This action removes a #${id} acreditacione`;
  }
}
