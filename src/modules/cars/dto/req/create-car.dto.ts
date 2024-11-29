import { PickType } from '@nestjs/swagger';

import { BaseCarsReqDto } from './base-cars.req.dto';

export class CreateCarDto extends PickType(BaseCarsReqDto, [
  'producer',
  'brand',
  'model',
  'year',
  'mileage',
  'image',
  'price',
  'description',
]) {}
