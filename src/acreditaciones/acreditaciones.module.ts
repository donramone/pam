import { Module } from '@nestjs/common';
import { AcreditacionesService } from './acreditaciones.service';
import { AcreditacionesController } from './acreditaciones.controller';
import { Acreditacion } from './entities/acreditacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcreditacionEmpleado } from './entities/acreditacionEmpleado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Acreditacion, AcreditacionEmpleado])],
  controllers: [AcreditacionesController],
  providers: [AcreditacionesService]
})
export class AcreditacionesModule {}
