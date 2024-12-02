import { PickType } from '@nestjs/swagger';
import { UserBaseResDto } from '../../../../dto/res/user.base.res.dto';

export class ManagerResDto extends PickType(UserBaseResDto, [
  'id',
  'name',
  'email',
  'role',
]) {}
