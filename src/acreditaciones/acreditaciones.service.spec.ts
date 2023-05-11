import { Test, TestingModule } from '@nestjs/testing';
import { AcreditacionesService } from './acreditaciones.service';

describe('AcreditacionesService', () => {
  let service: AcreditacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcreditacionesService],
    }).compile();

    service = module.get<AcreditacionesService>(AcreditacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
