export class AcreditacionEmpleadosDTO {
    areaNombre: string;
    fechaAcreditacion: Date;
    periodo: string;
    empleados: EmpleadoAcreditacionDTO[];
}

export class EmpleadoAcreditacionDTO {
    id: number;
    nombre: string;
    cuil: string;
    ocupacion: string;
    importe: number;
}