import { PickType } from '@nestjs/swagger';

import { AuthBaseReqDto } from './auth-base.req.dto';

export class SignInReqDto extends PickType(AuthBaseReqDto, [
  'email',
  'password',
  'deviceId',
]) {}
