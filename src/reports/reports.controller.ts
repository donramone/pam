import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

 // TODO: Buscar mejores nombres para los reportes por empleado y por acreditacion
  @Get('generate-pdf/:dni')
  async generatePdfEmpleado(@Param('dni') dni: string, @Res() res: Response) {
    const pdfBuffer = await this.reportsService.empleadoReport(dni);

    // Configurar el response para devolver el PDF
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=report.pdf',
    });

    res.send(pdfBuffer);
  }

  @Get('generate-pdfa/:id')
  async generatePdfAcreditacion(@Param('id') id: string, @Res() res: Response) {
    const pdfBuffer = await this.reportsService.acreditacionReport(id);

    // Configurar el response para devolver el PDF
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=report.pdf',
    });

    res.send(pdfBuffer);
  }

}
