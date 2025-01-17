import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { AcreditacionesService } from 'src/acreditaciones/acreditaciones.service';
import { PrinterService } from './printer.service';
import { reporteAcreditacionEmpleado } from './templates/reporte.empleado';
import { reporteAcreditacionArea } from './templates/reporte.area';

const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf',
  },
};

@Injectable()
export class ReportsService {
  constructor(
    private readonly acreditacionesService: AcreditacionesService,
    private readonly printerService: PrinterService,
  ) {}

async acreditacionReport(id: string): Promise<Buffer> {
      // Obtener datos de acreditaciones
      const numero: number = parseInt(id)
      const data = await this.acreditacionesService.getEmpleadosByNroAcreditacion2(numero);
      const dd = reporteAcreditacionArea(data);
      
      const pdfDoc = this.printerService.createPdf(dd);
      // Convierte el documento a Buffer
      return new Promise((resolve, reject) => {
        try {
          const chunks: Uint8Array[] = [];
          pdfDoc.on('data', (chunk) => chunks.push(chunk));
          pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
          pdfDoc.end();
        } catch (err) {
          reject(err);
        }
      });
}

  async empleadoReport(dni: string): Promise<Buffer> {
    // Obtener datos de acreditaciones
    const data = await this.acreditacionesService.findAcreditacionPorDniEmpleado(dni);
    const dd = reporteAcreditacionEmpleado(data);

    // Definir el contenido del PDF
/*     const documentDefinition: TDocumentDefinitions = {
      content: [
        { text: 'Reporte de Acreditaciones', style: 'header' },
        { text: `DNI: ${dni}`, style: 'subheader' },
        {
          table: {
            widths: ['*', '*'],
            body: [
              ['Campo 1', 'Campo 2'],
              ...data.acreditaciones.map((item) => ["xzxzx", "cdvxcvcv"]),
            ],
          },
        },
      ],
      styles: {
        header: { fontSize: 18, bold: true },
        subheader: { fontSize: 14, margin: [0, 10, 0, 10] },
      },
    }; 
    */
    // Generar el PDF
    const pdfDoc = this.printerService.createPdf(dd);
    // Convierte el documento a Buffer
    return new Promise((resolve, reject) => {
      try {
        const chunks: Uint8Array[] = [];
        pdfDoc.on('data', (chunk) => chunks.push(chunk));
        pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
        pdfDoc.end();
      } catch (err) {
        reject(err);
      }
    });
  }
}
