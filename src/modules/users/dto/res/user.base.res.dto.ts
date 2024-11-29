import { CarEntity } from '../../../../database/entities/car.entity';
import { CarResDto } from '../../../cars/dto/res/car.res.dto';
import { IAddress } from '../../interface/IAddress';

export class UserBaseResDto {
  id: string;
  name: string;
  email: string;
  address: IAddress[];
  age: number;
  phone: string;
  role: string;
  isPremium: boolean;
}
