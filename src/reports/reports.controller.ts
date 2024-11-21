import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('generate-pdf')
  async generatePDF(@Res() res: Response) {
    return null;
    /* const buffer = await this.reportsService.generatePDF();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
      'Content-Length': buffer.length,
    });

    res.end(buffer); */
  }

  @Get('generate-pdf/:dni')
  async generatePdf(@Param('dni') dni: string, @Res() res: Response) {
    const pdfBuffer = await this.reportsService.empleadoReport(dni);

    // Configurar el response para devolver el PDF
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=report.pdf',
    });

    res.send(pdfBuffer);
  }
}
