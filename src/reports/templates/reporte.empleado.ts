import { TDocumentDefinitions } from 'pdfmake/interfaces';
export const reporteAcreditacionEmpleado = (
  data: AcreditacionEmpleadoReporte,
): TDocumentDefinitions => {
  return {
    content: [
      { text: 'Listado de Acreditaciones', style: 'header' },
      { text: `Empleado: ${data.empleado.nombre}`, style: 'subheader' },
      { text: `CUIL: ${data.empleado.cuil}`, style: 'subheader' },
      { text: `Ocupación: ${data.empleado.ocupacion}`, style: 'subheader' },
      { text: `Convenio Nro: ${data.acreditaciones[1].nroConvenio}`, style: 'subheader' },
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
