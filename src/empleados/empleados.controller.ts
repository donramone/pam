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
  /*
    @Get(':id')
        async getbyId(@Req() request: Request) {
            return await this.crudService.getById(this.tableName, request.params.id);
        }
*/
  @Get(':id')
  findById(@Param('id') id: string) {
    //return this.empleadosService.findById(id);
    return this.empleadosService.findByArea(id);
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
    //return this.empleadosService.findByDni("29418853");
    //return this.empleadosService.findById(9);
    //return this.empleadosService.findByArea(3);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateEmpleadoDto: UpdateEmpleadoDto,
  ) {
    //console.log('Voy actualizar en controler ', updateEmpleadoDto);

    return this.empleadosService.update(id, updateEmpleadoDto);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    this.logger.log('delete id controller back');
    return this.empleadosService.remove(id);
  }
}
