import { UserResDto } from '../../../users/dto/res/user.res.dto';
import { TokenPairResDto } from './token-pair.res.dto';

export class AuthResDto {
  token: TokenPairResDto;
  user: UserResDto;
}
