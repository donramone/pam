import { Body, Controller, Get, Logger, Param, Patch } from "@nestjs/common";
import { ActividadService } from "./actividad.service";

@Controller('actividad')
export class ActividadController {
    logger = new Logger();
  constructor(private readonly actividadService: ActividadService) {}

  @Patch('update-salario/:actividadId')
  async updateSalario(@Param('actividadId') actividadId: number, @Body() updateSalarioDto: any) {
    this.logger.log('updateeeee ', actividadId);
    const empleadoActualizado = await this.actividadService.updateImporte(actividadId, updateSalarioDto.salario);
    return empleadoActualizado;
  }

    @Get('hello')
    getHello(): string {
      return 'Hola Mundo';
    }
}

