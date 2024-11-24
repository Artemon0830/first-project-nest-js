import { IAddress } from '../../interface/IAddress';
import { AddressBaseReqDto } from '../req/address.base.req.dto';

export class UserBaseResDto {
  id: string;
  name: string;
  email: string;
  address: IAddress[];
  age: number;
  phone: string;
  role: string;
  status: string;
}
