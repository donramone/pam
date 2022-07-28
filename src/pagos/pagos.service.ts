import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { Pago } from './entities/pago.entity';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pago)
    private readonly PagoRepository: Repository<Pago>,
  ) {}

  async create(createPagoDto: CreatePagoDto) {
    // NO ESTA INSERTANDO EL ID fK PERSONAL
    const pago = this.PagoRepository.create(createPagoDto);
    await this.PagoRepository.save(pago);
    return pago;
  }

  async findAll() {
    return await this.PagoRepository.find();
  }

  async findByPeriodo(periodo: string) {
    // armar consulta que tire todos los pagos sin especificar el periodo
    const empleados = await this.PagoRepository.createQueryBuilder('pago')
      .where('pago.periodo = :periodo', { periodo: periodo })
      .select([
        'pago.id',
        'pago.periodo',
        'pago.monto',
        'empleado.id',
        'empleado.nombre',
        'empleado.ocupacion',
      ])
      .innerJoin('pago.empleado', 'empleado')
      .getMany();
    return empleados;
  }

  async findByPersonal(id: number) {
    const empleados = await this.PagoRepository.createQueryBuilder('pago')
      .where('pago.empleadoId = :empleadoId', { empleadoId: id })
      .select([
        'pago.id',
        'pago.periodo',
        'pago.monto',
        'empleado.id',
        'empleado.nombre',
        'empleado.ocupacion',
      ])
      .innerJoin('pago.empleado', 'empleado')
      .getMany();
    return empleados;
  }

  findOne(id: number) {
    return `Fin ONE by ID retoornaaaaaa a #${id} pago`;
  }

  update(id: number, updatePagoDto: UpdatePagoDto) {
    return `This action updates a #${id} pago`;
  }

  remove(id: number) {
    return `This action removes a #${id} pago`;
  }
}
