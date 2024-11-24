import { UserEntity } from '../../../database/entities/user.entity';
import { UserResDto } from '../dto/res/user.res.dto';

export class UsersMapper {
  public static toUserResDto(user: UserEntity): UserResDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
      address: user.address,
      phone: user.phone,
      role: user.role,
      status: user.status,
    };
  }
}