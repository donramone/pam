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
import { CreateAcreditacionDTO } from './dto/CreateAcreditacion.dto';

import { UpdateAcreditacioneDto } from './dto/update-acreditaciones.dto';
import { CreateAcreditacionesEmpleadoDto } from './dto/create-acreditaciones-empleado.dto';

@Controller('acreditaciones')
export class AcreditacionesController {
  constructor(private readonly acreditacionesService: AcreditacionesService) {}

  @Post()
  create(@Body() dto: CreateAcreditacionDTO ) {
  //  return this.acreditacionesService.create(createAcreditacionesDto, createAcreditacionesEmpleadoDto);
  return this.acreditacionesService.createAcreditacion(dto);
  }

  @Get()
  findAll() {
    return this.acreditacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.acreditacionesService.findOne(+id);
  }

  @Get('area/:areaId')
  findByArea(@Param('areaId') id: number) {
    return this.acreditacionesService.findByArea(id)
  }

  @Get('nro/:nro')
  findByNroAcreditacion(@Param('nro') id: number) {
    return this.acreditacionesService.getEmpleadosByNroAcreditacion(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAcreditacioneDto: UpdateAcreditacioneDto,
  ) {
   // return this.acreditacionesService.update(+id, updateAcreditacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.acreditacionesService.remove(+id);
  }
}
