import { PickType } from '@nestjs/swagger';

import { BaseListsDto } from './base-lists.dto';

export class CreateListsDto extends PickType(BaseListsDto, [
  'make',
  'model',
  'year',
  'mileage',
  'image',
  'price',
  'description',
]) {}
