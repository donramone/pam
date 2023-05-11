import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PagosService } from './pagos.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';

@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post()
  create(@Body() createPagoDto: CreatePagoDto) {
    return this.pagosService.create(createPagoDto);
  }

  @Get()
  findAll() {
    return this.pagosService.findAll();
  }

  @Get('/periodo/:periodo')
  getByPeriodo(@Param('periodo') periodo: string) {
    return this.pagosService.findByPeriodo(periodo);
  }

  @Get('/personal/:idPersonal')
  getByPersonal(@Param('idPersonal') id: number) {
    return this.pagosService.findByPersonal(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagosService.findOne(+id);
  }
  @Get('/acreditacion/:id')
  getById(@Param('id') id: string) {
    return this.pagosService.getById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePagoDto: UpdatePagoDto) {
    return this.pagosService.update(+id, updatePagoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagosService.remove(+id);
  }
}
