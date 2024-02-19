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
import { UpdateEmpleadoDTO } from './dto/update-empleado.dto';

@Controller('empleados')
export class EmpleadosController {
  logger = new Logger();
  constructor(private readonly empleadosService: EmpleadosService) {}

    // cambiar luego por Save
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateEmpleadoDto: CreateEmpleadoDto,
  ) {
    return this.empleadosService.create(updateEmpleadoDto);
  //  return this.empleadosService.update(id, updateEmpleadoDto);
  }
  @Post()
  create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
    return this.empleadosService.create(createEmpleadoDto);
  }

  @Get('id/:id')
  findById(@Param('id') id: number) {
    return this.empleadosService.findById(id);
  }
  
  @Get('dni/:dni')
  findByDni(@Param('dni') dni: string) {
    return this.empleadosService.findByDni(dni);
  }
  
  @Get('area/:areaId')
  findByArea(@Param('areaId') id: string) {
    return this.empleadosService.findByArea(id);
  }
  @Get()
  findAll() {
    return this.empleadosService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
   // return this.empleadosService.remove(id);
  }
}
