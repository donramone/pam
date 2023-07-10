import { Module } from '@nestjs/common';
import { AcreditacionesService } from './acreditaciones.service';
import { AcreditacionesController } from './acreditaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Acreditacion } from './entities/acreditacion.entity';
import { AcreditacionEmpleado } from './entities/acreditacionEmpleado.entity';
import { Area } from 'src/area/entities/area.entity';
import { Empleado } from 'src/empleados/entities/empleado.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AcreditacionEmpleado,
      Acreditacion,
      Area,
      Empleado,
      
    ]),
  ],
  controllers: [AcreditacionesController],
  providers: [AcreditacionesService],
})
export class AcreditacionesModule {}
