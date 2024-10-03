import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1718076216364 implements MigrationInterface {
    name = 'InitialSchema1718076216364'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`acreditacion_empleado\` (\`id\` int NOT NULL AUTO_INCREMENT, \`importe\` decimal(10,2) NULL DEFAULT '0.00', \`nro_cuenta\` varchar(255) NOT NULL DEFAULT '0000000000000000', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`is_active\` tinyint NOT NULL DEFAULT 1, \`acreditacion_id\` int NOT NULL, \`empleado_id\` int NOT NULL, UNIQUE INDEX \`IDX_0ce8943d29418fae4d6c4b5bd2\` (\`acreditacion_id\`, \`empleado_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`empleado\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(120) NOT NULL, \`dni\` varchar(8) NOT NULL, \`cuil\` varchar(11) NOT NULL, \`fecha_nacimiento\` date NULL, \`direccion\` varchar(180) NULL, \`telefono\` varchar(12) NULL, \`email\` varchar(50) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`is_active\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_43c165ab1d50219f4345ae31e0\` (\`dni\`), UNIQUE INDEX \`IDX_75ab7574bc6d1397d2edff9646\` (\`cuil\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`actividad\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ocupacion\` varchar(255) NULL DEFAULT 'No especifica', \`importe\` decimal(10,2) NULL DEFAULT '0.00', \`estado\` tinyint NOT NULL DEFAULT 1, \`nro_cuenta\` varchar(255) NOT NULL DEFAULT '0000000000000000', \`nro_convenio\` varchar(255) NOT NULL DEFAULT '500117PP', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`is_active\` tinyint NOT NULL DEFAULT 1, \`empleado_id\` int NULL, \`area_id\` int NOT NULL, UNIQUE INDEX \`REL_8cea85cd978592edfd634edd93\` (\`empleado_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`area\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(120) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`is_active\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`acreditacion\` (\`id\` int NOT NULL AUTO_INCREMENT, \`total_importe\` decimal(10,2) NOT NULL, \`total_empleados\` int NULL, \`nro_convenio\` varchar(255) NOT NULL DEFAULT '500117PP', \`periodo\` varchar(255) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`is_active\` tinyint NOT NULL DEFAULT 1, \`area_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`acreditacion_empleado\` ADD CONSTRAINT \`FK_695036013842ff7616af0978923\` FOREIGN KEY (\`acreditacion_id\`) REFERENCES \`acreditacion\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`acreditacion_empleado\` ADD CONSTRAINT \`FK_e3498957b80fc9be1d2121a0e13\` FOREIGN KEY (\`empleado_id\`) REFERENCES \`empleado\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`actividad\` ADD CONSTRAINT \`FK_8cea85cd978592edfd634edd931\` FOREIGN KEY (\`empleado_id\`) REFERENCES \`empleado\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`actividad\` ADD CONSTRAINT \`FK_ae53227e81f2fed74bdf0874a0c\` FOREIGN KEY (\`area_id\`) REFERENCES \`area\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`acreditacion\` ADD CONSTRAINT \`FK_0c0c9bc22c5e5dd67942b70bb1d\` FOREIGN KEY (\`area_id\`) REFERENCES \`area\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`acreditacion\` DROP FOREIGN KEY \`FK_0c0c9bc22c5e5dd67942b70bb1d\``);
        await queryRunner.query(`ALTER TABLE \`actividad\` DROP FOREIGN KEY \`FK_ae53227e81f2fed74bdf0874a0c\``);
        await queryRunner.query(`ALTER TABLE \`actividad\` DROP FOREIGN KEY \`FK_8cea85cd978592edfd634edd931\``);
        await queryRunner.query(`ALTER TABLE \`acreditacion_empleado\` DROP FOREIGN KEY \`FK_e3498957b80fc9be1d2121a0e13\``);
        await queryRunner.query(`ALTER TABLE \`acreditacion_empleado\` DROP FOREIGN KEY \`FK_695036013842ff7616af0978923\``);
        await queryRunner.query(`DROP TABLE \`acreditacion\``);
        await queryRunner.query(`DROP TABLE \`area\``);
        await queryRunner.query(`DROP INDEX \`REL_8cea85cd978592edfd634edd93\` ON \`actividad\``);
        await queryRunner.query(`DROP TABLE \`actividad\``);
        await queryRunner.query(`DROP INDEX \`IDX_75ab7574bc6d1397d2edff9646\` ON \`empleado\``);
        await queryRunner.query(`DROP INDEX \`IDX_43c165ab1d50219f4345ae31e0\` ON \`empleado\``);
        await queryRunner.query(`DROP TABLE \`empleado\``);
        await queryRunner.query(`DROP INDEX \`IDX_0ce8943d29418fae4d6c4b5bd2\` ON \`acreditacion_empleado\``);
        await queryRunner.query(`DROP TABLE \`acreditacion_empleado\``);
    }

}
