import { PickType } from '@nestjs/swagger';
import { ManagerReqDto } from './manager.req.dto';

export class CreateManagerDto extends PickType(ManagerReqDto, [
  'name',
  'email',
  'age',
  'phone',
  'password',
  'role',
  'deviceId',
]) {}