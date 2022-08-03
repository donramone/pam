import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';

@Controller('empleados')
export class EmpleadosController {
  logger = new Logger();
  constructor(private readonly empleadosService: EmpleadosService) {}

  @Post()
  create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
    console.log(createEmpleadoDto);
    return this.empleadosService.create(createEmpleadoDto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.empleadosService.findById(id);
    //return this.empleadosService.findByArea(id);
  }
/*
  @Get('area/:id')
  findByArea(@Param('id') id: string) {
    return this.empleadosService.findByArea(id);
  }
*/
  @Get()
  findAll() {
    return this.empleadosService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateEmpleadoDto: UpdateEmpleadoDto,
  ) {
    return this.empleadosService.update(id, updateEmpleadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.empleadosService.remove(id);
  }
}
