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
    return this.AreaRepository.find()

  }

  findOne(id: number) {
    return `This action returns a #${id} area`;
  }

  update(id: number, updateAreaDto: UpdateAreaDto) {
    return `This action updates a #${id} area`;
  }

  remove(id: number) {
    return `This action removes a #${id} area`;
  }
}
