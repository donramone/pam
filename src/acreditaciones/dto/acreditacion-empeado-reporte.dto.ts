// acreditacion-report.dto.ts
export class AcreditacionReportDTO {
    nombre: string;
    cuil: string;
    ocupacion: string;
    nroCuenta: string;
    acreditaciones: AcreditacionDetailDTO[];
}

export class AcreditacionDetailDTO {
    id: number;
    fecha: Date;
    periodo: string;
    area: string;
    importe: number;
}