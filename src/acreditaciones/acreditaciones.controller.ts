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
import { CreateAcreditacionesEmpleadoDto } from './dto/create-acreditaciones-empleado.dto';

@Controller('acreditaciones')
export class AcreditacionesController {
  constructor(private readonly acreditacionesService: AcreditacionesService) {}

  @Post()
  create(@Body() createAcreditacionesDto: CreateAcreditacionesDto, createAcreditacionesEmpleadoDto: CreateAcreditacionesEmpleadoDto) {
    return this.acreditacionesService.create(createAcreditacionesDto, createAcreditacionesEmpleadoDto);
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
   // return this.acreditacionesService.update(+id, updateAcreditacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.acreditacionesService.remove(+id);
  }
}
