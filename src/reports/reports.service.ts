import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { AcreditacionesService } from 'src/acreditaciones/acreditaciones.service';
import { PrinterService } from './printer.service';
import { reporteAcreditacionEmpleado } from './templates/reporte.empleado';

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
 /*
  async generatePDF(): Promise<Buffer> {

 

    const docDefinition: TDocumentDefinitions = {
      content: [
        { text: 'Ejemplo de PDF con pdfmake', style: 'header' },
        {
          text: [
            'Este es un párrafo de ejemplo. ',
            { text: 'Texto en negrita', bold: true },
            ' y más texto normal.',
          ],
        },
        {
          style: 'tableExample',
          table: {
            body: [
              ['Columna 1', 'Columna 2', 'Columna 3'],
              ['Valor 1', 'Valor 2', 'Valor 3'],
              ['Valor 4', 'Valor 5', 'Valor 6'],
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
      },
    };

    // Genera el PDF
    const pdfDoc = this.printerService.createPdf(docDefinition)
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
*/
  async empleadoReport(dni: string): Promise<Buffer> {
    // Obtener datos de acreditaciones
    const data = await this.acreditacionesService.findAcreditacionPorDniEmpleado(dni);
    const dd = reporteAcreditacionEmpleado(data);

    // Definir el contenido del PDF
    const documentDefinition: TDocumentDefinitions = {
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
