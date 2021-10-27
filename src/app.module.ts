import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AreaModule } from './area/area.module';

import { EmpleadosModule } from './empleados/empleados.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'luigi',
      password: '123654789',
      database: 'pam',
      entities: [],
      synchronize: true,
    }),
    AreaModule,
    EmpleadosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
