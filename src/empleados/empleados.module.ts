import { Module } from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { EmpleadosController } from './empleados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empleado } from './entities/empleado.entity';
import { Actividad } from './entities/actividad.entity';
import { ActividadController } from './actividad.controller';
import { ActividadService } from './actividad.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Empleado,Actividad])
  ],
  controllers: [EmpleadosController, ActividadController],
  providers: [EmpleadosService,ActividadService]
})
export class EmpleadosModule {}
