import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { UserBaseReqDto } from '../../../users/dto/req/user.base.req.dto';

export class AuthBaseReqDto extends PickType(UserBaseReqDto, [
  'name',
  'age',
  'email',
  'phone',
  'role',
  'status',
  'address',
  'password',
]) {
  @IsNotEmpty()
  @IsString()
  readonly deviceId: string;
}
