import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { Area } from './entities/area.entity';

@Injectable()
export class AreaService {

  constructor(
    @InjectRepository(Area)
    private readonly AreaRepository: Repository<Area>
  ){}

  async create(createAreaDto: CreateAreaDto) {
    const area = this.AreaRepository.create(createAreaDto);
    return await this.AreaRepository.save(area);
  }

  findAll() {
    return this.AreaRepository.find();
  }

  findOne(id: number) {
    return this.AreaRepository.findOne(id);
  }

  update(id: number, updateAreaDto: UpdateAreaDto) {
    this.AreaRepository.update({ id }, updateAreaDto);
    return this.AreaRepository.findOne({ id });
  }

  remove(id: number) {
    this.AreaRepository.delete({ id });
    return { deleted: true };
  }
}
