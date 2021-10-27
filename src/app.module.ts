import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AreaModule } from './area/area.module';
import { EmpleadosModule } from './empleados/empleados.module';

@Module({
  imports: [AreaModule, EmpleadosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
