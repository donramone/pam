import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { AcreditacionesModule } from 'src/acreditaciones/acreditaciones.module';
import { PrinterService } from './printer.service';

@Module({
  imports: [AcreditacionesModule],
  controllers: [ReportsController],
  providers: [ReportsService, PrinterService],
})
export class ReportsModule {}
