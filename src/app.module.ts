import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AreaModule } from './area/area.module';

@Module({
  imports: [AreaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
