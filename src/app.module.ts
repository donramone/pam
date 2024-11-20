import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { AreaModule } from './area/area.module';
import { EmpleadosModule } from './empleados/empleados.module';
import { PagosModule } from './pagos/pagos.module';
import { AcreditacionesModule } from './acreditaciones/acreditaciones.module';
import { DataSourceConfig } from './config/data.source';
import { ReportsModule } from './reports/reports.module';


const ENV = process.env.NODE_ENV;
console.log(`Loaded env file: ${ENV}`);
@Module({
  imports: [
    ConfigModule.forRoot({
      //envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      //const envFilePath = ENV? === 'production' ? '.env.production' : '.env.development';
      envFilePath: [`.env.development`],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({...DataSourceConfig
      
    }),
    AcreditacionesModule,
    AreaModule,
    EmpleadosModule,
    PagosModule,
    ReportsModule,
  ],
  controllers: [AppController],
 // providers: [AppService],
})

export class AppModule {}
