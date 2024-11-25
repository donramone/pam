import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';

/*
generarPdfPorAcreditacionEmpleado(data: any) {
    console.log(data);
    
  
      const documentDefinition = {
        content: [
          { text: 'Informe de Acreditaciones', style: 'header' },
          { text: `Nombre del empleado: ${data.empleado.nombre}`, style: 'subheader' },
          { text: `Ocupación: ${data.empleado.ocupacion}`, style: 'subheader' },
          { text: 'Acreditaciones:', style: 'subheader' },
          {
            table: {
              headerRows: 1,
              widths: ['auto', '*', '*'],
              body: [
                ['ID', 'Fecha', "Salario" ],
                ...data.acreditaciones.map(acreditacion => [
                 acreditacion.id.toString(),
                 new Date(acreditacion.created_at).toLocaleDateString('es-ES'),
                 Number(acreditacion.salario).toFixed(2),
                ])
              ]
            }
          }
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10]
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 10, 0, 5]
          }
        }
      };
  
      pdfMake.createPdf(documentDefinition).open();
    }
  
    generarPdfPorNroAcreditacion(acreditacion: Acreditacion) {
      
      const docDefinition = this.generarDocumento(acreditacion);
      const pdf = pdfMake.createPdf(docDefinition);
      pdf.open();
    }
  
    generarDocumento(acreditacion: Acreditacion) {
      
      const docDefinition = {
        footer: function (currentPage, pageCount) {
          return {
            margin: [25, 10, 0, 0],
            fontSize: 7,
            text: 'Pagina ' + currentPage.toString() + ' / ' + pageCount,
          };
        },
        content: [
          {
            columns: [
              {
                image:
                  'data:image/png;base64,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',
                width: 150,
                alignment: 'left',
              },
              [
                {
                  text: acreditacion.area.nombre,
                  color: '#333333',
                  width: '*',
                  fontSize: 24,
                  bold: true,
                  alignment: 'right',
                  margin: [0, 0, 0, 15],
                },
                {
                  // aca podria pasar solo los dos parametros que usa id y periodo
                  stack: this.getStack(acreditacion),
                },
              ],
            ],
          },
  
          '\n\n',
  
          {
            table: {
              headerRows: 1,
              widths: [38, 160, 58, 135, '*'],
              body: this.getTableBody(acreditacion),
            },
          },
          '\n\n',
          {
            table: {
              headerRows: 1,
              widths: ['auto', '*', '*', '*'],
              body: this.armarTotalesTablaAcreditacion(acreditacion.totalEmpleados, acreditacion.totalImporte),
            },
          },
        ],
      };
  
      return docDefinition;
    }
  
    getTableBody(MockedData :Acreditacion) {
      //Por ahora ANY debo ver como armo la interface
     
      const upDown = [false, true, false, true];
      const marginRow = [0, 4, 0, 4];
      const marginHeader = [0, 8, 0, 8];
      const myFillColor = '#eaf2f5';
  
      var body = [
        [
          {
            text: 'Legajo',
            fontSize: 12,
            fillColor: '#eaf2f5',
            alignment: 'left',
            border: upDown,
            margin: marginHeader,
          },
          {
            text: 'Nombre',
            fillColor: '#eaf2f5',
            alignment: 'center',
            border: upDown,
            margin: marginHeader,
          },
          {
            text: 'DNI',
            fillColor: '#eaf2f5',
            alignment: 'center',
            border: upDown,
            margin: marginHeader,
          },
          {
            text: 'Ocupación',
            fillColor: '#eaf2f5',
            alignment: 'center',
            border: upDown,
            margin: marginHeader,
          },
          {
            text: 'Importe',
            fillColor: '#eaf2f5',
            alignment: 'center',
            border: upDown,
            margin: marginHeader,
          },
        ],
      ];
     
      const totalEmpleados = MockedData.acreditacionEmpleados.length;
      for (let j = 0; j < totalEmpleados; j++) {
        body.push([
          {
            // text: MockedData.acreditacionEmpleados[j].empleado.id,
            text: MockedData.acreditacionEmpleados[j].id.toString(),
            fontSize: 10,
            fillColor: '',
            alignment: 'left',
            border: upDown,
            margin: marginRow,
          },
          {
            // text: MockedData.acreditacionEmpleados[j].empleado.nombre,
            // console.log(MockedData.acreditacionEmpleados[0].empleado.nombre);
            text: MockedData.acreditacionEmpleados[j].empleado.nombre,
            fontSize: 10,
            fillColor: '',
            alignment: 'left',
            border: upDown,
            margin: marginRow,
          },
          {
            text: MockedData.acreditacionEmpleados[j].empleado.dni,
            fontSize: 10,
            fillColor: '',
            alignment: 'right',
            border: upDown,
            margin: marginRow,
          },
          {
            text:  MockedData.acreditacionEmpleados[j].empleado.actividad.ocupacion, //MockedData.acreditacionEmpleados[j].empleado.actividad.ocupacion, 
            fontSize: 10,
            fillColor: '',
            alignment: 'center',
            border: upDown,
            margin: marginRow,
          },
          {
            text: MockedData.acreditacionEmpleados[j].importe.toString(),
            fontSize: 10,
            fillColor: '#f5f5f5',
            alignment: 'right',
            border: upDown,
            margin: marginRow,
          },
        ]);
      }
  
      return body;
    }
  
    getStack(datos) {
      // Stack me permite manejar mejor los estilos
      const colorTitle = '#aaaaab';
      const stack = [
        {
          columns: [
            {
              text: 'Fecha:  ',
              color: '#aaaaab',
              bold: true,
              fontSize: 10,
              alignment: 'right',
              margin: [0, 20, 0, 5],
            },
            {
              text: '112345',
              color: '#aaaaab',
              bold: false,
              fontSize: 10,
              alignment: 'left',
              margin: [0, 20, 0, 5],
            },
            {
              text: 'Mari:  ',
              color: '#aaaaab',
              bold: true,
              fontSize: 10,
              alignment: 'right',
              margin: [0, 20, 0, 5],
            },
            {
              text: 'Rsm',
              color: '#aaaaab',
              bold: false,
              fontSize: 10,
              alignment: 'left',
              margin: [0, 20, 0, 5],
            },
          ],
        },
  
        {
          columns: [
            {
              // Datos de la acreditacion
              text: 'Acreditación Nro.',
              color: colorTitle,
              bold: true,
              width: '*',
              fontSize: 12,
              alignment: 'right',
            },
            {
              text: datos.id,
              bold: false,
              color: '#333333',
              fontSize: 12,
              alignment: 'right',
              width: 100,
            },
          ],
        },
        {
          columns: [
            {
              text: 'Fecha Acreditación:',
              color: colorTitle,
              bold: true,
              width: '*',
              fontSize: 12,
              alignment: 'right',
            },
            {
              text: 'June 01, 2016',
              bold: false,
              color: '#333333',
              fontSize: 12,
              alignment: 'right',
              width: 100,
            },
          ],
        },
        {
          columns: [
            {
              text: 'Periodo',
              color: colorTitle,
              bold: true,
              fontSize: 12,
              alignment: 'right',
              width: '*',
            },
            {
              text: datos.periodoMes,
              bold: true,
              fontSize: 10,
              alignment: 'right',
              color: '#333333',
              width: 100,
            },
          ],
        },
        {
          columns: [
            {
              text: 'Tipo',
              color: colorTitle,
              bold: true,
              fontSize: 12,
              alignment: 'right',
              width: '*',
            },
            {
              text: 'Caja de Ahorro',
              bold: false,
              fontSize: 12,
              alignment: 'right',
              color: '#333333',
              width: 100,
            },
          ],
        },
      ];
      return stack;
    }
  
    armarTotalesTablaAcreditacion(totalEmpleados: number, totalImporte: number) {
      var body = [
        [
          {
            text: 'Cantidad de empleados:',
            fontSize: 12,
            border: [false, false, false, true],
            alignment: 'left',
            margin: [0, 5, 0, 5],
          },
          {
            text: totalEmpleados,
            fontSize: 16,
            border: [false, false, false, true],
            fillColor: '',
            alignment: 'left',
            margin: [0, 5, 5, 5],
          },
          {
            text: 'Importe total',
            bold: true,
            fontSize: 12,
            alignment: 'right',
            border: [false, false, false, true],
            margin: [0, 5, 10, 5],
          },
          {
            text: totalImporte,
            bold: true,
            fontSize: 16,
            alignment: 'right',
            border: [false, false, false, true],
            fillColor: '#f5f5f5',
            margin: [0, 5, 0, 5],
          },
        ],
      ];
      return body;
    }
  
  }
  */

  export const reporteAcreditacionEmpleado = (data: AcreditacionEmpleadoReporte): TDocumentDefinitions => { 
    console.log(data) // aca logeo lo que te paso chatgpt
 
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
              ['ID Acreditacion', 'Fecha', 'Periodo', 'Importe' ],
              ...data.acreditaciones.map(acreditacion => [
               acreditacion.id,
               new Date(acreditacion.created_at).toLocaleDateString('es-ES'),
               acreditacion.periodo,
               Number(acreditacion.importe).toFixed(2),
              ])
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5]
        }
      }
    };

  }