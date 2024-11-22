import { IAddress } from '../../interface/IAddress';

export class UserBaseResDto {
  id: string;
  name: string;
  email: string;
  address: IAddress[];
  age: number;
  role: string;
  status: string;
  created_at: Date;
}
