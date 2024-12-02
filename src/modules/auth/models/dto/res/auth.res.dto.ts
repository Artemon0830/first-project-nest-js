import { TokenPairResDto } from './token-pair.res.dto';
import { ManagerResDto } from '../../../../users/modules/admin-service/dto/res/manager.res.dto';
import { UserResDto } from '../../../../users/dto/res/user.res.dto';

export class AuthResDto {
  tokens: TokenPairResDto;
  user: UserResDto
}

export class AuthManagerResDto {
  tokens: TokenPairResDto;
  user: ManagerResDto
}