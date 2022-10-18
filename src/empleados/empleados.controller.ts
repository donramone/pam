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

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateEmpleadoDto: UpdateEmpleadoDto,
  ) {
    return this.empleadosService.update(id, updateEmpleadoDto);
  }
  @Post()
  create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
    console.log(createEmpleadoDto);
    return this.empleadosService.create(createEmpleadoDto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.empleadosService.findById(id);
  }
  @Get('area/:areaId')
  findByArea(@Param('areaId') id: string) {
    return this.empleadosService.findByArea(id);
  }
  /*
/employees?dept='HR'
/employee?id=1234&dept='HR'
/comapny/:companyId    /staff/:staffId
  @Get('area/:id')
  findByArea(@Param('id') id: string) {
    return this.empleadosService.findByArea(id);
  }
*/
  @Get()
  findAll() {
    return this.empleadosService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.empleadosService.remove(id);
  }
}
