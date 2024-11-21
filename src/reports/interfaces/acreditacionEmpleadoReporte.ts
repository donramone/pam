interface AcreditacionEmpleadoReporte {
    empleado: {
      nombre: string;
      cuil: string;
      ocupacion: string;
    };
    acreditaciones: {
      id: number;
      created_at: Date; // aca cambiar por fecha
      periodo: string;
      importe: number;
    }[];
  }