import { UserEntity } from '../../../database/entities/user.entity';
import { IJwtPayload } from '../../auth/models/interfaces/jwt-payload.interface';
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
      isPremium: user.isPremium,
    };
  }

  public static toIUserData(user: UserEntity, jwtPayload: IJwtPayload): any {
    return {
      userId: user.id,
      email: user.email,
      jwtPayload: jwtPayload.deviceId,
    };
  }
}
