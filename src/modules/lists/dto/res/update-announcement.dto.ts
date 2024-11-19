import { PickType } from '@nestjs/swagger';

import { BaseListsDto } from './base-lists.dto';

export class UpdateAnnouncementDto extends PickType(BaseListsDto, ['price']) {}
