import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AreaModule } from './area/area.module';

import { EmpleadosModule } from './empleados/empleados.module';
import { PagosModule } from './pagos/pagos.module';
import { AcreditacionesModule } from './acreditaciones/acreditaciones.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'pam_dev',
      entities: [__dirname + './**/**/*entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: false,
    }),
    AreaModule,
    EmpleadosModule,
    PagosModule,
  //  AcreditacionesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
