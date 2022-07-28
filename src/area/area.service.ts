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
    await this.AreaRepository.save(area);
    return area;
  }

  async findAll() {
    return await this.AreaRepository.find()

  }

  async findOne(id: number) {
    console.log('findone area service');
    
    const area = await this.AreaRepository.findOne(id);
    return area;
  }

  async update(id: number, updateAreaDto: UpdateAreaDto) {
    await this.AreaRepository.update({ id }, updateAreaDto);
    return await this.AreaRepository.findOne({ id });

  }

  async remove(id: number) {
    await this.AreaRepository.delete({ id });
    return { deleted: true };
  }
}
