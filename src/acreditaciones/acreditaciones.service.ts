import { Injectable } from '@nestjs/common';
import { CreateAcreditacionesDto } from './dto/create-acreditaciones.dto';
import { UpdateAcreditacioneDto } from './dto/update-acreditaciones.dto';
import { Acreditacion } from './entities/acreditacion.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AcreditacionEmpleado } from './entities/acreditacionEmpleado.entity';
import { CreateAcreditacionesEmpleadoDto } from './dto/create-acreditaciones-empleado.dto';

@Injectable()
export class AcreditacionesService {
  constructor(
    @InjectRepository(Acreditacion)
    private readonly AcreditacionesRepository: Repository<Acreditacion>,
    private readonly AcreditacionEmpleado: Repository<AcreditacionEmpleado>,
  ) {}
  async create(createAcreditacionesDto: CreateAcreditacionesDto, createAcreditacionesEmpleadoDto: CreateAcreditacionesEmpleadoDto) {
    const acreditacion = this.AcreditacionesRepository.create(
      createAcreditacionesDto,
    );

    const acreditacionEmpleado = this.AcreditacionEmpleado.create(
      createAcreditacionesEmpleadoDto,
    );
    
    await this.AcreditacionEmpleado.save(acreditacionEmpleado);  
    await this.AcreditacionesRepository.save(acreditacion);
    return acreditacion;
  }

  async findAll() {
    return await this.AcreditacionesRepository.find();
  }

  async findOne(id: number) {
    const acreditacion = await this.AcreditacionesRepository.findOne(id);

    return acreditacion;
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
