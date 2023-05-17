import { Injectable } from '@nestjs/common';
import { CreateAcreditacionesDto } from './dto/create-acreditaciones.dto';
import { UpdateAcreditacioneDto } from './dto/update-acreditaciones.dto';
import { Acreditaciones } from './entities/acreditacione.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AcreditacionesService {
  constructor(
    @InjectRepository(Acreditaciones)
    private readonly AcreditacionesRepository: Repository<Acreditaciones>,
  ) {}
  async create(createAcreditacionesDto: CreateAcreditacionesDto) {
    const acreditacion = this.AcreditacionesRepository.create(
      createAcreditacionesDto,
    );
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
