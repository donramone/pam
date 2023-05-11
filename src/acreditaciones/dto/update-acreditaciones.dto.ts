import { PartialType } from '@nestjs/mapped-types';
import { CreateAcreditacionesDto } from './create-acreditaciones.dto';

export class UpdateAcreditacioneDto extends PartialType(
  CreateAcreditacionesDto,
) {}
