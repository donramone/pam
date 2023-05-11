import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AcreditacionesService } from './acreditaciones.service';
import { CreateAcreditacionesDto } from './dto/create-acreditaciones.dto';
import { UpdateAcreditacioneDto } from './dto/update-acreditaciones.dto';

@Controller('acreditaciones')
export class AcreditacionesController {
  constructor(private readonly acreditacionesService: AcreditacionesService) {}

  @Post()
  create(@Body() createAcreditacionesDto: CreateAcreditacionesDto) {
    return this.acreditacionesService.create(createAcreditacionesDto);
  }

  @Get()
  findAll() {
    return this.acreditacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.acreditacionesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAcreditacioneDto: UpdateAcreditacioneDto,
  ) {
    return this.acreditacionesService.update(+id, updateAcreditacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.acreditacionesService.remove(+id);
  }
}
