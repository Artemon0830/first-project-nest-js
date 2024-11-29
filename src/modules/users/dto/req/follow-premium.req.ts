import { PickType } from '@nestjs/swagger';

import { UserBaseReqDto } from './user.base.req.dto';

export class FollowPremiumReq extends PickType(UserBaseReqDto, ['isPremium']) {}
