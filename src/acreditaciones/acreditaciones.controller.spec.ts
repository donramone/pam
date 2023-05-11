import { Test, TestingModule } from '@nestjs/testing';
import { AcreditacionesController } from './acreditaciones.controller';
import { AcreditacionesService } from './acreditaciones.service';

describe('AcreditacionesController', () => {
  let controller: AcreditacionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcreditacionesController],
      providers: [AcreditacionesService],
    }).compile();

    controller = module.get<AcreditacionesController>(AcreditacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
