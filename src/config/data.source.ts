import { ConfigModule, ConfigService } from '@nestjs/config'
import { DataSource, DataSourceOptions} from 'typeorm'


ConfigModule.forRoot({

});

const configService = new ConfigService

export const DataSourceConfig: DataSourceOptions  = {
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + "/../migrations/*{.ts,.js}"], 
    synchronize: true, // True destruye datos
    logging: false, // Habilitar logs de SQL
    logger: "advanced-console", // Usar logger avanzado
}

export const AppDS = new DataSource(DataSourceConfig);