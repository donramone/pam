import { TDocumentDefinitions } from 'pdfmake/interfaces';
export const reporteAcreditacionEmpleado = (
  data: AcreditacionEmpleadoReporte,
): TDocumentDefinitions => {
  return {
    content: [
      { text: 'Informe de Acreditaciones', style: 'header' },
      { text: `Empleado: ${data.empleado.nombre}`, style: 'subheader' },
      { text: `Ocupación: ${data.empleado.ocupacion}`, style: 'subheader' },
      { text: 'Acreditaciones:', style: 'subheader' },
      {
        table: {
          headerRows: 1,
          widths: ['auto', '*', '*', '*'],
          body: [
            ['ID Acreditacion', 'Fecha', 'Periodo', 'Importe'],
            ...data.acreditaciones.map((acreditacion) => [
              acreditacion.id,
              new Date(acreditacion.created_at).toLocaleDateString('es-ES'),
              acreditacion.periodo,
              Number(acreditacion.importe).toFixed(2),
            ]),
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
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 5],
      },
    },
  };
};
