import { Module } from '@nestjs/common';
import { AcreditacionesService } from './acreditaciones.service';
import { AcreditacionesController } from './acreditaciones.controller';
import { Acreditaciones } from './entities/acreditacione.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Acreditaciones])],
  controllers: [AcreditacionesController],
  providers: [AcreditacionesService]
})
export class AcreditacionesModule {}
