import { PickType } from '@nestjs/swagger';

import { UserBaseReqDto } from '../../../../users/dto/req/user.base.req.dto';

export class BaseAuthReqDto extends PickType(UserBaseReqDto, [
  'name',
  'email',
  'password',
  'age',
  'phone',
  'address',
  'role',
  'deviceId',
]) {}
