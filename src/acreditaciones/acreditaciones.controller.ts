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
import { CreateAcreditacionDTO } from './dto/create-acreditaciones.dto';
import { UpdateAcreditacioneDto } from './dto/update-acreditaciones.dto';
import { Acreditacion } from './entities/acreditacion.entity';
import { AcreditacionResponse } from './Interfaces/acreditacion.response';

@Controller('acreditaciones')
export class AcreditacionesController {
  constructor(private readonly acreditacionesService: AcreditacionesService) {}

  @Post()
  create(@Body() dto: any) {
    return this.acreditacionesService.createAcreditacion(dto);
  }

  @Get()
  findAll(): Promise<Acreditacion[]>  {
    return this.acreditacionesService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string): Promise<Acreditacion> {
    return this.acreditacionesService.findAcreditacionPorId(+id);
  }

  @Get('test/:id')
  findOneTest(@Param('id') id: string) {
    
    return this.acreditacionesService.findOneTest(+id);
  }

  @Get('nro/:nro')
  findByNroAcreditacion(@Param('nro') id: number): Promise<AcreditacionResponse> {
    //return this.acreditacionesService.getEmpleadosByNroAcreditacion2(id);
    // Aca tengo que usar el nuevo metodo que cree para el reporte!!
    return this.acreditacionesService.getEmpleadosByNroAcreditacion2(id);
  }

  @Get('area/:areaId')
  findByArea(@Param('areaId') id: number) {
    return this.acreditacionesService.findAcreditacionPorArea(id);
  }

  @Get('empleado/:empleadoId')
  findByEmpleado(@Param('empleadoId') id: number) {
    return this.acreditacionesService.findAcreditacionPorIdEmpleado(id);
  }

  @Get('dni/:dni')
  findByDni(@Param('dni') dni: string) {
   return this.acreditacionesService.findAcreditacionPorDniEmpleado(dni);
   // return this.acreditacionesService.findByDni2(dni);
   
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
  //  return this.acreditacionesService.remove(+id);
  }
}
