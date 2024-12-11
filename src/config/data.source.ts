import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';


export const createDataSourceOptions = (
  configService: ConfigService,
): DataSourceOptions => ({
  type: 'mysql',
  host: configService.get<string>('DB_HOST'),
  port: parseInt(configService.get<string>('DB_PORT'), 10) || 3306,
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false,
  logging: false,
  logger: 'advanced-console',
});
export const dataSourceFactory = async (
  configService: ConfigService,
): Promise<DataSource> => {
  return new DataSource(createDataSourceOptions(configService));
};
