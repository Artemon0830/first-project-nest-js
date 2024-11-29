import { PickType } from '@nestjs/swagger';

import { BaseCarsReqDto } from './base-cars.req.dto';

export class UpdateCarDto extends PickType(BaseCarsReqDto, [
  'price',
  'description',
]) {}
