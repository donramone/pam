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


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot({...DataSourceConfig}),
    AcreditacionesModule,
    AreaModule,
    EmpleadosModule,
    PagosModule,
  ],
  controllers: [AppController],
 // providers: [AppService],
})
export class AppModule {}
