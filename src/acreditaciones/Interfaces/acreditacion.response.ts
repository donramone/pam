export interface AcreditacionResponse {
  area: {
    id: number;
    nombre: string;
  };
    totalImporte: number;
    totalEmpleados: number;
    nroConvenio: string;
    periodo: string;
    acreditacionEmpleados: {
      id: number;
      importe: number;
      nroCuenta: string;
      empleado: {
        id?: number;
        nombre: string;
        dni: string;
        cuil?: string;
      };
    }[];
    created_at: Date;
    updated_at: Date;
    is_active: boolean;
  }