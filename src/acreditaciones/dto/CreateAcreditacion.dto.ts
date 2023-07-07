export class CreateAcreditacionDTO {
    totalImporte: number;
    totalEmpleados: number;
    periodoMes: number;
    acreditacionEmpleados: {
      empleadoID: number;
      salario: number;
    }[];
    area: {
      id: number;
      nombre: string
    };
  }