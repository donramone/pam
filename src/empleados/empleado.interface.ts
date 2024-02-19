export interface Empleado {
    id?: number;
    nombre: string;
    dni: string;
    cuil: string;
    fechaNacimiento?: Date;
    direccion?: string;
    telefono?: string;
    actividad: Actividad;
  }
  
  // En el archivo actividad.interface.ts
  export interface Actividad {
    id?: number;
    ocupacion: string;
    importe: number;
    estado: boolean;
    nro_cuenta: string;
    nro_convenio: string;
    area: Area;
  }

  export interface Area {
    id?: number;
    nombre: string;
  }