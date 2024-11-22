import { PickType } from '@nestjs/swagger';

import { AuthBaseReqDto } from './auth-base.req.dto';

export class SignUpReqDto extends PickType(AuthBaseReqDto, [
  'name',
  'age',
  'email',
  'phone',
  'role',
  'status',
  'address',
  'password',
]) {}
