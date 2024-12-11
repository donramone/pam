import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { AreaModule } from './area/area.module';
import { EmpleadosModule } from './empleados/empleados.module';
import { PagosModule } from './pagos/pagos.module';
import { AcreditacionesModule } from './acreditaciones/acreditaciones.module';
import { createDataSourceOptions, dataSourceFactory } from './config/data.source';
import { ReportsModule } from './reports/reports.module';

const envFilePath =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';
console.log(`Loading environment variables from: ${envFilePath}`);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env.development',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...createDataSourceOptions(configService),
      }),
    }),
    AcreditacionesModule,
    AreaModule,
    EmpleadosModule,
    PagosModule,
    ReportsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
