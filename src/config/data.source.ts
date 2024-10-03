import { ConfigModule, ConfigService } from '@nestjs/config'
import { DataSource, DataSourceOptions} from 'typeorm'


ConfigModule.forRoot({

});

const configService = new ConfigService
console.log(`PROCESS ENV: ${ JSON.stringify(process.env.NODE_ENV)}`);
console.log(`Database Host: ${ process.env.DB_HOST}`);
console.log(`Database Port: ${ process.env.DB_PORT}`);
console.log(`Database User: ${ process.env.DB_USERNAME}`);
console.log(`Database Password: ${process.env.DB_PASSWORD}`);
console.log(`Database Name: ${process.env.DB_DATABASE}`);
// console.log(`FilePath: ${process.env.}`);


export const DataSourceConfig: DataSourceOptions  = {
   
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + "/../migrations/*{.ts,.js}"], 
    synchronize: false, // True destruye datos
    logging: false, // Habilitar logs de SQL
    logger: "advanced-console", // Usar logger avanzado
}

export const AppDS = new DataSource(DataSourceConfig);